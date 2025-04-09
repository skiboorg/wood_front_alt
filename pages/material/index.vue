<!--catalog index-->
<script setup lang="ts">
const items = ref([
  { label: 'Главная', route: '/' },
  { label: 'Породы' },

]);
</script>

<template>
  <div class="container">
    <Breadcrumbs :items="items" />
    <h1 class="text-2xl  font-bold mb-4">Породы</h1>
    <Materials/>
  </div>

</template>

<style scoped>

</style>