<script setup lang="ts">
const props = defineProps(['products'])
</script>

<template>

  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="border  overflow-hidden" v-for="product in products" :key="product.id">
      <img :src="product.image" alt="Товар" class=" relative w-full object-cover">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-7 text-gray-600">{{product.name}}</h3>
        <p class="text-sm text-gray-600 mb-1" v-for="item in product.features" :key="item.id">
          {{item.label}}: {{item.value}}
        </p>

        <div class="flex items-center justify-between">
          <p class="text-xl font-bold mt-2">{{product.display_price}}</p>
          <nuxt-link :to="`/catalog/${product.cat_slug}/${product.subcat_slug}/${product.slug}`">
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40.9707" height="40.9707" transform="matrix(-1 0 0 1 41.7168 0.277344)" fill="#2C1F22"/>
              <path d="M12.4656 19.5587L26.0474 19.5587L21.1188 14.6301L22.4354 13.3135L29.6118 20.4899L22.4354 27.6662L21.1188 26.3496L26.0474 21.421L12.4656 21.421V19.5587Z" fill="white"/>
            </svg>


          </nuxt-link>
        </div>

      </div>
    </div>

</div>
</template>

<style scoped>

</style>