<!--catalog index-->
<script setup lang="ts">
const items = ref([
  { label: 'Главная', route: '/' },
  { label: 'Услуги' },

]);
</script>

<template>
  <div class="container">
    <Breadcrumbs :items="items" />
    <h1 class="text-2xl  font-bold mb-4">Услуги</h1>
    <Services/>
  </div>

</template>

<style scoped>

</style>