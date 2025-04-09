<script setup lang="ts">
const {$api} = useNuxtApp()

const services = ref([])

onBeforeMount(async () => {
  services.value = await $api('/api/shop/services')
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-3 w-full">
    <div @click="navigateTo(`/services/${item.slug}`)" v-for="item in services"
         class=" cursor-pointer border">
      <div :style="{ backgroundImage: `url(${item.image})` }" class=" grid grid-cols-4 items-start w-full h-[150px] p-10">
        <div class="col-span-3">
          <div class="flex items-center gap-4 text-white ">
            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6" cy="6.77148" r="6" fill="#A3613C"/>
            </svg>

            <p class="font-semibold">{{item.name}}</p>
          </div>
        </div>
      </div>
      <div class="p-10 grid grid-cols-12">
        <div class="col-span-9">
          <p class="">{{item.short_description}}</p>
        </div>

        <div class="col-span-3 justify-self-end">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="44" height="44" transform="matrix(-1 0 0 1 44 0)" fill="#2C1F22"/>
            <path d="M12.586 20.707H27.172L21.879 15.414L23.293 14L31 21.707L23.293 29.414L21.879 28L27.172 22.707H12.586V20.707Z" fill="white"/>
          </svg>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>