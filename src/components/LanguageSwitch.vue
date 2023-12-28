<template>
    <v-select
      style="width: 100px;"
      ref="switcher"
      v-model="$i18n.locale"
      :items="$i18n.availableLocales"
      item-text="name"
      item-value="val"
      @update:model-value="handleDir"
    >
    </v-select>
</template>
<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
const switcher = ref(null)
onMounted(()=>{
    const lang = localStorage.getItem("lang")
    if(!! lang){
        switcher.value.$i18n.locale = lang
    }
})
const handleDir = () => {
    const lang = switcher.value.$i18n.locale
    localStorage.setItem("lang",lang)
    checkLanguage(lang)
}
const checkLanguage = (lang) => {
    if(lang == 'ar'){
        document.querySelector('html').classList.add('is-rtl')
    }else{
        document.querySelector('html').classList.remove('is-rtl')
    }
}
</script>
<style>
html.is-rtl * {
    direction: rtl;
}
</style>