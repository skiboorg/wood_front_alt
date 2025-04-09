<script setup lang="ts">

const {$api} = useNuxtApp()

const categories = ref([])

onBeforeMount(async () => {
  categories.value = await $api('/api/shop/categories')
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
    <div class="border  p-7 relative h-[430px] flex flex-col items-start justify-between group"
         v-for="category in categories" :key="category.id">
      <div class="flex items-start justify-between">
        <div class="flex gap-4">
          <img class="w-[50px] h-[50px] rounded-full object-cover" :src="category.image" alt="">
          <p class="text-xl font-medium w-[50%] mb-4">{{category.name}}</p>
        </div>

        <p v-if="category.display_amount" class="text-sm text-[#7E7E7E]">{{category.display_amount}} товаров</p>
      </div>
      <div class="grid grid-cols-12 w-full items-end">
        <div class="col-span-11 flex gap-2 flex-wrap">
          <nuxt-link :to="`/catalog/${category.slug}/${subcat.slug}`" class="inline-block text-sm text-[#7E7E7E] border px-3 py-2 "
             v-for="subcat in category.sub_categories" :key="subcat.slug">{{subcat.name}}
          </nuxt-link>
        </div>
        <div class="justify-self-end">
          <nuxt-link :to="`/catalog/${category.slug}`" class="bg-black group-hover:bg-[#A3613C] transition-all duration-200  w-[44px] h-[44px] flex items-center justify-center" href="">
            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.465598 6.93566L14.0474 6.93566L9.11879 2.00708L10.4354 0.69043L17.6118 7.86681L10.4354 15.0432L9.11879 13.7265L14.0474 8.79796L0.465598 8.79796V6.93566Z" fill="white"/>
            </svg>

          </nuxt-link>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>