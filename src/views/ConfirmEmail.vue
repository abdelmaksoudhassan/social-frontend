<template>
    <v-row class="justify-center align-center h-100">
        <component :is="currentComponent" @EmailConfirmed="onEmailConfirmed" v-bind="currentProperties"></component>
    </v-row>
</template>
<script setup>
import ConfirmEmail from '@/components/ConfirmEmail.vue'
import { defineAsyncComponent, computed } from 'vue';
import { useRouter } from 'vue-router'
import { shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
const Done = defineAsyncComponent(()=> import ('@/components/Done.vue'))
const Router = useRouter()
const currentComponent = shallowRef(ConfirmEmail)
const currentProperties = computed(()=>{
    return { header: t('emailConfirmed'),body: t('goLogin') }
})
function onEmailConfirmed(val){
    console.log(val)
    currentComponent.value = Done
    setTimeout(()=>{
        Router.push({ name: 'Home' })
    },2000)
}
</script>