<script setup lang="ts">
const {$api} = useNuxtApp()

const materials = ref([])

onBeforeMount(async () => {
  materials.value = await $api('/api/shop/materials')

})
</script>
<!---->
<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
    <div class="border" v-for="material in materials" :key="material.id">
      <div class=" p-5">
        <div class="grid grid-cols-12">
          <div class="col-span-4">
            <img class="w-[100px] h-[100px] object-cover rounded-full" :src="material.image" alt="">
          </div>
          <div class="col-span-8">
            <p class="font-medium text-3xl leading-[36px] mb-4">{{material.name}}</p>
            <p class="font-normal min-h-[100px]">
              {{material.short_description}}
            </p>
          </div>



        </div>
      </div>
      <div class="p-5 pt-0 bg-white ">
        <p class="font-medium mb-3">Рекомендуется для:</p>
        <div class="flex flex-wrap gap-1 mb-6">
          <p class="inline-block text-sm text-[#7E7E7E] bg-[#f4f4f4] px-3 py-2 rounded-lg"
             v-for="item in material.recommend" :key="item.id">
            {{item.name}}
          </p>

        </div>
        <p class="font-medium mb-3">Преимущества:</p>
        <div class="flex flex-wrap gap-1 mb-6">
                    <p class="inline-block text-sm text-[#7E7E7E] bg-[#f4f4f4] px-3 py-2 rounded-lg"
                       v-for="item in material.tags" :key="item.id">
                      {{item.name}}
                    </p>
                  </div>

        <nuxt-link :to="`/material/${material.slug}`">
          <Button  class="px-4"  size="large" severity="secodary" label="В каталог"/>
        </nuxt-link>


      </div>
    </div>
  </div>
</template>

<style scoped>

</style>