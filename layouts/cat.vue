<script setup lang="ts">
useSeoMeta({
  title: 'VSM - пиломатериалы в Москва и области, доступные цены и гарантия качества!',
  ogTitle: 'VSM - пиломатериалы в Москва и области, доступные цены и гарантия качества!',
  description: 'VSM - пиломатериалы в Москва и области, доступные цены и гарантия качества!',
  ogDescription: 'VSM - пиломатериалы в Москва и области, доступные цены и гарантия качества!',
})
const items = ref([
  { label: 'Главная', route: '/' },
  { label: 'Каталог', route: '/catalog' },
  { label: 'Accessories' },
  { label: 'Keyboard' },
  { label: 'Wireless' }
]);

const {$api} = useNuxtApp()
const route = useRoute()
const category_slug = ref('')
const category = ref({})
const products = ref([])
const selected_subcat = ref(null)
category_slug.value = route.params.category_slug
onMounted(async () => {
  console.log('category_slug',route)

  category.value = await $api(`/api/shop/category/${category_slug.value}`)
  selected_subcat.value = category.value?.sub_categories[0]?.slug
  await fetchSubCategory()
  console.log(category.value)
})

const fetchSubCategory = async () => {
  const resp  = await $api(`/api/shop/subcategory/${selected_subcat.value}`)
  products.value = resp.products
}

const subcatChange = async (subcat_slug) => {
  console.log(subcat_slug)
  selected_subcat.value = subcat_slug

  await fetchSubCategory()

}





</script>



<template>
    <Header />
    <Breadcrumbs :items="items" />
    <main class="mt-4">
      <SubcategoriesBtns :subcategories="category.sub_categories" :selected="selected_subcat" @change="subcatChange"/>
      <ItemsGrid :products="products"/>
      <slot/>
    </main>
    <Footer/>
</template>




<style scoped>

</style>