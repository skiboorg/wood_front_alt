<script setup lang="ts">
const items=[
  { label: 'Главная', route: '/' },
  { label: 'Результаты поиска' },
]
const route = useRoute()
const {$api} = useNuxtApp()
const products = ref([])

const query = computed(()=>route.query)
products.value= await $api(`/api/shop/search?q=${query.value.q}`)

watch( () => route.fullPath, async () => {
  products.value= await $api(`/api/shop/search?q=${query.value.q}`)
});



</script>

<template>
<div class="container">
  <Breadcrumbs :items="items" />

    <h1 class="text-2xl  font-bold mb-4">Результаты поиска {{query.q}}</h1>

  <ItemsGrid :products="products"/>

</div>
</template>

<style scoped>

</style>