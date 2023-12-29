<template>
    <v-sheet max-width="400" class="mx-auto pa-5 rounded-lg">
        <v-form @submit.prevent="resetPassword">
            <v-text-field
                v-model="email"
                :rules="email_rules"
                :label="$t('email')"
            ></v-text-field>
            <Alert v-if="msg" color="error" :msg="msg"></Alert>
            <v-btn
                type="submit"
                block
                class="mt-2 bg-blue"
                :disabled="invalidForm"
                :loading="loading"
                :text="$t('send')"
            ></v-btn>
        </v-form>
        <p class="text-h8 ma-5">
            {{ $t('willSendNewPassword') }}
        </p>
    </v-sheet>
</template>
<script setup>
import { $axios } from '@/axios/axios.instance';
import { useVuelidate } from '@vuelidate/core'
import { useI18n } from 'vue-i18n';
import { email as isEmail } from '@vuelidate/validators'
import { defineAsyncComponent } from 'vue';
import { ref, computed } from 'vue';
const Alert = defineAsyncComponent(()=>import('@/components/Alert.vue'))
const { t } = useI18n()
const email = ref('')
const loading = ref(false)
const msg = ref(null)
const emailRules = {
    isEmail
}
const email$ = useVuelidate(emailRules, email)
const email_rules = ref([
    () => {     
        if (! email$.value.$invalid) return true

        return t('enterCorrectEmail')
    },
])
const invalidForm = computed(()=>{
    return (email.value.length == 0) || (email$.value.$invalid)
})
const emit = defineEmits(['PasswordSent'])
function resetPassword(){
    loading.value = true
    $axios.post('/mail/password',{ email: email.value }).then(res=>{
        return res.data
    }).then(data=>{
        const { message } = data
        emit('PasswordSent',message)
        loading.value = false
    }).catch(err=>{
        console.log(err)
        msg.value = err.response.data.message || t('errMsg')
        loading.value = false
    })
}
</script>