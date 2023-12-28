<template>
    <v-card :loading="loading" class="my-20">
        <v-form @submit.prevent="savePost" class="ma-5">
            <v-textarea rows="1" clearable :label="$t('newPost')" variant="outlined" v-model="text"></v-textarea>
            <span class="text-info text-subtitle-2">
                {{'( png, jpeg, jpg, mp3, mp4 ) '+$t('only')}}
            </span>
            <v-file-input
                accept="image/png, image/jpeg, image/jpg, video/mp4, audio/mpeg"
                :label="$t('upload')+' '+$t('file')+' ( '+$t('optional')+' )'"
                v-model="uploader"
            ></v-file-input>
            <Alert v-if="msg" :msg="msg"></Alert>
            <v-btn
                color="deep-purple"
                type="submit"
                :loading="loading"
                append-icon="mdi-checkbox-marked-circle"
                :disabled="text.length == 0">{{ $t('share') }}
            </v-btn>
        </v-form>
    </v-card>
</template>
<script setup>
import jwtInterceptor from '@/axios/auth-axios.instance';
import { err_Msg } from '@/helpers/helpers';
import { defineAsyncComponent } from 'vue';
const Alert = defineAsyncComponent(()=>import('@/components/Alert.vue'))
import { ref } from 'vue';
const text = ref('')
const uploader = ref(null)
const loading = ref(false)
const msg = ref(null)
const emit = defineEmits(['PostSaved'])
const savePost = () => {
    const formData = new FormData()
    formData.append('text',text.value)
    if (uploader.value) {
        formData.append('media',uploader.value[0])   
    }
    loading.value = true
    jwtInterceptor.post('/posts',formData).then(res=>{
        return res.data
    }).then(data=>{
        loading.value = false
        console.log(data)
        emit('PostSaved',data)
    }).catch(err=>{
        console.log(err)
        msg.value = err.response.data.message || err_Msg()
        loading.value = false
    })
}
</script>