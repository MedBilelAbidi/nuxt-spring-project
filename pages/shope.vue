<template>
    <div>

        <template>
                <Sidebar class="glosy-bg" :modal="false" :dismissable="false" v-model:visible="visible">

                </Sidebar>
                <Button icon="pi pi-plus" @click="visible = true" />

        </template>
        
    </div>
</template>

<script setup>
const visible = ref(true);

</script>

<style lang="scss" scoped>

</style>