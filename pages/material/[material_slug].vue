<script setup lang="ts">
const {$api} = useNuxtApp()
const route = useRoute()
const items = ref([]);
const material = ref(null)
const {material_slug} = route.params
onMounted(async () => {


  material.value = await $api(`/api/shop/material/${material_slug}`)
  items.value = [
    { label: 'Главная', route: '/' },
    { label: 'Породы', route: '/material' },
    { label: material.value.name }
  ]

})
</script>

<template>
  <div v-if="material" class="container">
    <Breadcrumbs :items="items" />
    <div class="flex gap-2 items-end mb-4">
      <h1 class="text-2xl  font-bold">{{material.name}} </h1>
    </div>
    <ItemsGrid :products="material.material_products"/>
    <div v-if="material.html_content" v-html="material.html_content" class="mt-10"></div>
  </div>
</template>

<style scoped>

</style>