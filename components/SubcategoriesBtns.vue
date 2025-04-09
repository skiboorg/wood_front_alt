<script setup lang="ts">
const props = defineProps(['subcategories','selected'])
const emits = defineEmits(['change'])

const change_subcat = (slug)=>{
  emits('change',slug)
}



</script>

<template>

  <div class="flex flex-wrap gap-2 mb-6">
    <Button :severity="selected===subcategory.slug ? 'primary' : 'secondary'"
            :outlined="selected!==subcategory.slug"

            :label="subcategory.name"
            @click="change_subcat(subcategory.slug)"
            v-for="subcategory in subcategories" :key="subcategory.id"
    />
  </div>
</template>

<style scoped>

</style>