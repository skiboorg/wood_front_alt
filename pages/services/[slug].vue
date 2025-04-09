<script setup lang="ts">
const items = ref([])
const service = ref({})
const {$api} = useNuxtApp()
const route = useRoute()
onBeforeMount(async () => {

  service.value = await $api(`/api/shop/service/${route.params.slug}`)
  items.value = [
    { label: 'Главная', route: '/' },
    { label: 'Услуги', route: '/services' },
    { label: service.value.name }

  ]
})
</script>

<template>
  <div v-if="service" class="container">
    <Breadcrumbs :items="items" />
    <h1 class="text-4xl font-medium mb-10 ">{{service.name}}</h1>
    <div v-html="service.html_content"></div>
  </div>
</template>

<style scoped>

</style>