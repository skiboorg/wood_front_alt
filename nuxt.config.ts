import Aura from '@primevue/themes/aura';
import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@primevue/nuxt-module", 'nuxt-swiper'],
  css: [
      'primeicons/primeicons.css',
      '~/assets/styles/tailwind.css',
      '~/assets/styles/vars.css',
      '~/assets/styles/sass/style.sass',

  ],
    ssr: false,

  primevue: {
    autoImport: true,
    importTheme: { from: '~/themes/theme.js' },
    // options: {
    //   theme: {
    //     preset: Aura,
    //     variables: {
    //       // Пример изменения стандартных цветов PrimeVue
    //       '--primary-color': '#1D4ED8',  // Пример кастомного цвета
    //       '--secondary-color': '#9333EA',  // Пример кастомного цвета
    //       '--background-color': '#f4f4f4', // Пример кастомного фона
    //     }
    //   }
    // }
  },
    runtimeConfig: {
        public:{
            APIURL: 'http://127.0.0.1:8000',
            //APIURL: 'https://laurom.ru',
        }
    },

  compatibilityDate: '2024-11-08'
})