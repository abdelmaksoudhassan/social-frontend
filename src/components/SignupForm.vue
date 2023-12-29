<template>
    <v-sheet width="300" class="mx-auto ma-10">
        <v-form @submit.prevent="signup">
            <v-text-field
                v-model="email"
                :rules="email_rules"
                @focus="resetErr"
                :label="$t('email')"
            ></v-text-field>
            <v-text-field
                type="password"
                v-model="password"
                :rules="password_rules"
                @focus="resetErr"
                :label="$t('password')"
            ></v-text-field>
            <Alert v-if="msg" color="error" :msg="msg"></Alert>
            <v-btn type="submit" block class="mt-2 bg-success" :loading="loading" :disabled="invalidForm">
                {{ $t('newAccount') }}
            </v-btn>
        </v-form>
    </v-sheet>
</template>
<script setup>
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { useI18n } from 'vue-i18n';
import { minLength, maxLength, email as isEmail } from '@vuelidate/validators'
import { computed } from 'vue';
import { $axios } from '@/axios/axios.instance'
import { defineAsyncComponent } from 'vue';
const Alert = defineAsyncComponent(()=>import('../components/Alert.vue'))
const { t } = useI18n()
const email = ref('')
const emailRules = {
    isEmail
}
const email$ = useVuelidate(emailRules, email)
const password = ref('')
const passwordRules = {
    minLength: minLength(8),
    maxLength: maxLength(25)
}
const password$ = useVuelidate(passwordRules, password)
const loading = ref(false)
const msg = ref(null)
const email_rules = [
        () => {     
            if (! email$.value.$invalid) return true

            return t('enterCorrectEmail')
        },
    ]
const password_rules = [
    () => {     
        if (! password$.value.$invalid) return true

        return t('passwordMessage')
    },
]
const invalidForm = computed(()=>{
    return (email.value.length == 0) || (email$.value.$invalid) || (password.value.length == 0)  || (password$.value.$invalid)
})
const emit = defineEmits(['OtpSent'])
const resetErr = () => {
    if(msg.value){
        msg.value = null
    }
}
const signup = () => {
    localStorage.setItem('email',email.value)
    localStorage.setItem('password',password.value)
    loading.value = true
    const body = {email: email.value}
    $axios.post('/mail/otp',body).then(res=>{
        return res.data
    }).then(data=>{
        const { message } = data
        loading.value = false
        emit('OtpSent',message)
    }).catch(err=>{
        msg.value = err.response.data.message || t('errMsg')
        console.log(err)
        loading.value = false
    })
}
</script>