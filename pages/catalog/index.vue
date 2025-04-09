<!--catalog index-->
<script setup lang="ts">
const items = ref([
  { label: 'Главная', route: '/' },
  { label: 'Каталог' },

]);
</script>

<template>
  <div class="container">
    <Breadcrumbs :items="items" />
    <h1 class="text-2xl  font-bold mb-4">Каталог</h1>
    <Catalog/>
  </div>

</template>

<style scoped>

</style>