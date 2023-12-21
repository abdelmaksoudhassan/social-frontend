<template>
    <v-btn :size="size" color="error" append-icon="mdi-delete" @click="onDelete">{{$t('delete')}}</v-btn>
</template>
<script setup>
import jwtInterceptor from '@/axios/auth-axios.instance';
const emit = defineEmits(['DeleteDone'])
const props = defineProps({
    size:{
        type: String,
        default: 'large',
        validator(val){
            return ['small','large','x-large'].includes(val)
        }
    },
    url:{
        type: String,
        required: true
    }
})
const onDelete = () => {
    jwtInterceptor.delete(props.url).then(res=>{
        return res.data
    }).then(data=>{
        emit('DeleteDone',data)
    }).catch(err=>{
        console.log(err)
    })
}
</script>