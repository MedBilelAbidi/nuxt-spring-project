<template>
    <div>
        <header class="p-3  nav-bar-app">
            <div class="container">
              <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

        
                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                  <li><nuxt-link to="/" class="nav-link px-2 text-white">Home</nuxt-link></li>
                  <li><nuxt-link  to="/shope" class="nav-link px-2 text-white">Shope</nuxt-link></li>
                  <li><nuxt-link  to="#" class="nav-link px-2 text-white">Pricing</nuxt-link></li>
                  <li><nuxt-link  to="#" class="nav-link px-2 text-white">FAQs</nuxt-link></li>
                  <li><nuxt-link  to="#" class="nav-link px-2 text-white">About</nuxt-link></li>
                </ul>
        
                
        
                <div class="text-end">
                    <Button label="Login" class="me-1" outlined />
                    <Button label="Sign-up" />
                </div>
              </div>
            </div>
          </header>
        <main class="container">

            <NuxtPage></NuxtPage>

        </main>

    </div>
</template>

<script setup>

const items = ref([
    {
        label: 'Router',
        icon: 'pi pi-palette',
        items: [
            {
                label: 'Styled',
                route: '/theming'
            },
            {
                label: 'Unstyled',
                route: '/unstyled'
            }
        ]
    },
    {
        label: 'Programmatic',
        icon: 'pi pi-link',
        command: () => {
            router.push('/introduction');
        }
    },
    {
        label: 'External',
        icon: 'pi pi-home',
        items: [
            {
                label: 'Vue.js',
                url: 'https://vuejs.org/'
            },
            {
                label: 'Vite.js',
                url: 'https://vuejs.org/'
            }
        ]
    }
]);
</script>

<style lang="scss" scoped>

</style>