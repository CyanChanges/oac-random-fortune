import Aura from '@primevue/themes/aura';


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@primevue/nuxt-module', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
  unocss: {
    nuxtLayers: true
  },
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  }
})
