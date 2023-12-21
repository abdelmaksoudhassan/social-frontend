<template>
    <v-app>
        <v-Container class="h-100">
            <LanguageSwitch></LanguageSwitch>
            <View />
        </v-Container>
    </v-app>
</template>
<script setup>
import View from './View.vue'
import LanguageSwitch from '@/components/LanguageSwitch.vue';
</script>
<style scoped>
.v-main{
    height: 100%;
}
</style>