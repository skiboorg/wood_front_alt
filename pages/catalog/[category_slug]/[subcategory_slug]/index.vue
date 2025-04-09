<!--subcat index-->
<script setup lang="ts">
const items = ref([]);

const {$api} = useNuxtApp()
const route = useRoute()

const category = ref(null)
const products = ref([])
const selected_subcat = ref(null)
const html_content = ref('')
const {category_slug,subcategory_slug} = route.params

onMounted(async () => {
  if (subcategory_slug) {
    selected_subcat.value = subcategory_slug
  } else {
    selected_subcat.value = category.value?.sub_categories[0]?.slug
  }

  category.value = await $api(`/api/shop/category/${category_slug}`)
  items.value = [
    { label: 'Главная', route: '/' },
    { label: 'Каталог', route: '/catalog' },
    { label: category.value.name },
    { label: category.value.sub_categories.find(x=>x.slug===selected_subcat.value).name },

  ]
  await fetchSubCategory()
  console.log(category.value)
})

const fetchSubCategory = async () => {
  const resp  = await $api(`/api/shop/subcategory/${selected_subcat.value}`)
  products.value = resp.products
  html_content.value = resp.html_content
}

const subcatChange = async (subcat_slug) => {
  console.log(subcat_slug)
  selected_subcat.value = subcat_slug
  const newPath = `/catalog/${category_slug}/${subcat_slug}`;
  await navigateTo(newPath, { replace: true });

}

</script>



<template>
  <div v-if="category" class="container">
  <Breadcrumbs :items="items" />
    <div class="flex gap-2 items-end mb-4">
      <h1 class="text-2xl  font-bold">{{category.name}} </h1>
      <p v-if="category.display_amount" class="text-md font-semibold text-[#7E7E7E]">{{category.display_amount}} товаров</p>
    </div>

    <SubcategoriesBtns :subcategories="category.sub_categories" :selected="selected_subcat" @change="subcatChange"/>

    <ItemsGrid :products="products"/>
    <div v-if="html_content" v-html="html_content" class="mt-10"></div>

  </div>
</template>




<style scoped>

</style>