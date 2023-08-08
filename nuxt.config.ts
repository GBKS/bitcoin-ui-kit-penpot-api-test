// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/_import.scss" as *;'
        }
      }
    }
  },
  css: [
    '@/assets/css/_base.scss'
  ]
})
