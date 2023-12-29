<template>
    <v-row class="justify-center align-center h-100">
        <component :is="currentComponent" @PasswordSent="onPasswordSent" v-bind="currentProperties"></component>
    </v-row>
</template>
<script setup>
import ResetPasswordForm from '@/components/ResetPasswordForm.vue';
import { defineAsyncComponent, computed } from 'vue';
import { useRouter } from 'vue-router'
import { shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
const Done = defineAsyncComponent(()=> import ('@/components/Done.vue'))
const { t } = useI18n()
const Router = useRouter()
const currentComponent = shallowRef(ResetPasswordForm)
const currentProperties = computed(()=>{
    return { header: t('newPasswordSent'),body: t('goToEmail') }
})
function onPasswordSent(val){
    console.log(val)
    currentComponent.value = Done
    setTimeout(()=>{
        Router.push({ name: 'Home' })
    },2000)
}
</script>