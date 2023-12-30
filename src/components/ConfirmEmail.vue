<template>
    <v-sheet max-width="400">
        <v-form @submit.prevent="confirmEmail">
            <v-otp-input
                ref="otpRef"
                v-model="otp"
                length="6"
            ></v-otp-input>
            <Alert v-if="msg" :msg="msg" color="error"></Alert>
            <v-btn
                :disabled="otp.length != 6"
                type="submit"
                block
                class="mt-2 bg-blue"
                :loading="loading"
                :text="$t('confirm')"
            ></v-btn>
        </v-form>
        <p class="text-h8 ma-5 text-center">
            {{ $t('enterOtp') }}
        </p>
    </v-sheet>
</template>
<script setup>
import { $axios } from '@/axios/axios.instance';
import { onMounted } from 'vue';
import { defineAsyncComponent } from 'vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const Alert = defineAsyncComponent(()=>import('./Alert.vue'))
const { t } = useI18n()
const otp = ref('')
const otpRef = ref(null)
const msg = ref(null)
const loading = ref(false)
onMounted(()=>{
    otpRef.value.focus()
})
const emit = defineEmits(['EmailConfirmed'])
function confirmEmail(){
    const email = localStorage.getItem('email')
    const password = localStorage.getItem('password')
    const body = { email, password, otp: otp.value }
    loading.value = true
    $axios.post('/auth/signup',body).then(res=>{
        return res.data
    }).then(data=>{
        loading.value = false
        const { message } = data
        emit('EmailConfirmed',message)
    }).catch(err=>{
        loading.value = false
        msg.value = err.response.data.message || t('errMsg')
        console.log(err)
    })
}
</script>