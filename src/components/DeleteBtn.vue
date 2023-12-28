<template>
    <v-btn :loading="loading" :size="size" color="error" append-icon="mdi-delete" @click="onDelete">{{$t('delete')}}</v-btn>
</template>
<script setup>
import jwtInterceptor from '@/axios/auth-axios.instance';
import { ref } from 'vue';
const emit = defineEmits(['DeleteDone'])
const loading = ref(false)
const props = defineProps({
    size:{
        type: String,
        default: 'large',
        validator(val){
            return ['x-small','small','large','x-large'].includes(val)
        }
    },
    url:{
        type: String,
        required: true
    }
})
const onDelete = () => {
    loading.value = true
    jwtInterceptor.delete(props.url).then(res=>{
        return res.data
    }).then(data=>{
        loading.value = false
        emit('DeleteDone',data)
    }).catch(err=>{
        loading.value = false
        console.log(err)
    })
}
</script>