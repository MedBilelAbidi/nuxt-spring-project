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
    "primeflex/primeflex.scss",
  ],
  modules: ['nuxt-primevue',
  [
      
    "@pinia/nuxt",
    {
      autoImports: [
        "defineStore",

        ["defineStore", "definePiniaStore"],
      ],
    },
    

  ]],
  runtimeConfig: {
    public: {
      productBaseUrl: 'http://localhost:8888/PRODUIT-SERVICE/produits',
      clientBaseUrl: 'http://localhost:8888/CLIENT-SERVICE/clients',
      factureBaseUrl: 'http://localhost:8888/FACTURE-SERVICE/full-facture'
    },
    
  },
  imports: {
    dirs: [
      "components/**/*",
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**',
      'store',
      'utils/**'

    ],

  },
  primevue: {
    options: {
      ripple: true
    },
    components: {
      include: '*'
    },
    directives: {
      include: '*'
  }
  }
});
