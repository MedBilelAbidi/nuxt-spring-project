export default defineNuxtConfig({
  app: {
    head: {
      title: "Nuxt App",
    },
  },
  css: [
    "primevue/resources/themes/lara-light-green/theme.css",
    "@/assets/main.css",
    "primeicons/primeicons.css",
    "~/assets/style.scss",
  ],
  modules: ['nuxt-primevue'],
  primevue: {
    options: {
      ripple: true
    },
    components: {
      include: '*'
    }
  }
});
