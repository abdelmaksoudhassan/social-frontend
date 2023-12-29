<template>
    <div class="d-flex flex-column flex-sm-row justify-center align-center h-100">
        <v-col md="6" class="text-center">
            <span class="text-h4 text-md-h1 text-blue font-weight-bold">Social</span>
            <p class="text-h6 text-md-h4">
                {{ $t('home.intro') }}
            </p>
        </v-col>
        <v-col  md="6">
            <v-sheet max-width="350" class="mx-auto pa-5 rounded-lg">
                <v-form @submit.prevent="login">
                    <v-text-field
                        v-model="email"
                        :label="$t('email')"
                    ></v-text-field>
                    <v-text-field
                        type="password"
                        v-model="password"
                        :label="$t('password')"
                    ></v-text-field>
                    <Alert v-if="msg" :msg="msg"></Alert>
                    <v-btn
                        :loading="loading"
                        type="submit"
                        block
                        class="mt-2 bg-blue"
                        :text="$t('login')"
                    ></v-btn>
                </v-form>
                <RouterLink to="/forget-password" style="text-decoration: none; margin: 3px 0px;">
                    {{ $t('forgetPassword') }}
                </RouterLink>
                <v-divider></v-divider>
                <FullscreenDialog ref="dialogRef" :title="$t('newAccount')">
                    <template #body>
                        <component :is="currentComponent" v-bind="currentProperties" @OtpSent="onOtpSent"></component>
                    </template>
                </FullscreenDialog>
            </v-sheet>
        </v-col>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import FullscreenDialog from '../components/FullscreenDialog.vue'
import { defineAsyncComponent } from 'vue';
import { shallowRef } from 'vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router'
import { $axios } from '../axios/axios.instance'
import { useCookies } from "vue3-cookies";
import { useAuthStore } from '@/store/auth'
import { useI18n } from 'vue-i18n';
import { io } from '@/helpers/socket-io';
const { t } = useI18n()
const SignupForm = defineAsyncComponent(()=>import('@/components/SignupForm.vue'))
const Done = defineAsyncComponent(()=>import('@/components/Done.vue'))
const Alert = defineAsyncComponent(()=>import('@/components/Alert.vue'))
const Router = useRouter()
const AuthStore = useAuthStore()
const { cookies } = useCookies();
const currentComponent = shallowRef(SignupForm)
const email = ref('')
const password = ref('')
const dialogRef = ref(null)
const msg = ref(null)
const loading = ref(false)
const onOtpSent = (val) => {
    console.log(val)
    currentComponent.value = Done
    setTimeout(()=>{
        dialogRef.value.dialog = false
        Router.push({ name: 'confirmEmail' })
    },2000)
}
const currentProperties = computed(()=>{
    return { header:  t('otpSent'),body: t('goToEmail')}
})
function login(){
    const body = { email: email.value, password: password.value }
    loading.value = true
    $axios.post('/auth/signin',{...body},{withCredentials: true}).then(res=>{
        return res.data
    }).then(data=>{
        const {access,refresh,user} = data
        cookies.set('Access-Token',access)
        cookies.set('Refresh-Token',refresh)
        AuthStore.setUser(user)
        Router.push({ name: 'Posts' })
        io.connect()
        io.emit('join',user._id)
    }).catch(err=>{
        console.log(err)
        msg.value = !err.response ? t('errMsg') : err.response.data.message || t('errMsg')
        loading.value = false
    })
}
</script>