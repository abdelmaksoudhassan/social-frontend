<template>
    <v-card :loading="loading" class="my-20">
        <v-form @submit.prevent="savePost" class="ma-5">
            <v-textarea rows="1" clearable :label="$t('edit')" variant="outlined" v-model="text"></v-textarea>
            <div v-if="postMedia && newMedia==false" class="d-flex align-center justify-space-between">
                <p>{{ _postMedia }}</p>
                <v-btn @click="newMedia=true">{{$t('delete')}}</v-btn>
            </div>
            <template v-else>
                <span class="text-info text-subtitle-2">
                    {{'( png, jpeg, jpg, mp3, mp4 ) '+$t('only')}}
                </span>
                <v-file-input
                    accept="image/png, image/jpeg, image/jpg, video/mp4, audio/mpeg"
                    :label="$t('upload')+' '+$t('file')+' ( '+$t('optional')+' )'"
                    v-model="uploader"
                ></v-file-input>
            </template>
            <!-- <Alert v-if="msg" :msg="msg"></Alert> -->
            <v-btn
            color="deep-purple"
            type="submit"
            :loading="loading"
            append-icon="mdi-checkbox-marked-circle"
            :disabled="text.length == 0">{{ $t('save') }}</v-btn>
        </v-form>
    </v-card>
</template>
<script setup>
// import { defineAsyncComponent } from 'vue';
// const Alert = defineAsyncComponent(()=>import('@/components/Alert.vue'))
import jwtInterceptor from '@/axios/auth-axios.instance';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
const text = ref('')
const uploader = ref(null)
const loading = ref(false)
const newMedia = ref(false)
const msg = ref(null)
// const emit = defineEmits(['PostSaved'])
const props = defineProps({
    postId:{
        required: true,
        type: String
    },
    postText:{
        required: true,
        type: String
    },
    postMedia:{
        required: true
    }
})
onMounted(()=>{
    text.value = props.postText
})
const _postMedia = computed(()=>{
    if(props.postMedia){
        return props.postMedia.url.split('-')[1]
    }
    return null
})
const savePost = () => {
    const { postId } = props
    const formData = new FormData()
    formData.append('text',text.value)
    if (uploader.value) {
        formData.append('media',uploader.value[0])   
    }
    loading.value = true
    jwtInterceptor.patch(`/posts/${postId}`,formData,{ headers:{'Old-Media': newMedia.value ? 'DELETE' : 'KEEP' } }).then(res=>{
        return res.data
    }).then(data=>{
        loading.value = false
        console.log(data)
    }).catch(err=>{
        console.log(err)
        msg.value = err.response.data.message || err_Msg()
        loading.value = false
    })
}
</script>