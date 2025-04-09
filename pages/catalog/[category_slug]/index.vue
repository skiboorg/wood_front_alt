<!--category index-->
<script setup lang="ts">
const {$api} = useNuxtApp()
const route = useRoute()
const {category_slug} = route.params
const category = ref({})
onBeforeMount(async () => {
  category.value = await $api(`/api/shop/category/${category_slug}`)
  const newPath = `/catalog/${category_slug}/${category.value.sub_categories[0].slug}`;
  await navigateTo(newPath, { replace: true });
})


</script>

<template>
</template>

<style scoped>

</style>