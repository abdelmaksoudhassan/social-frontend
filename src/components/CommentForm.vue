<template>
    <v-form  @submit.prevent="sendComment">
        <input type="text" v-model="comment_" class="txt" :placeholder="$t('comment')" />
        <v-btn
            type="submit"
            :text="$t('send')"
            color="primary"
            :loading="loading"
        ></v-btn>
    </v-form>
</template>
<script setup>
import jwtInterceptor from '@/axios/auth-axios.instance';
import { onMounted } from 'vue';
import { ref } from 'vue';
const emit = defineEmits(['CommentDone'])
const comment_ = ref('')
const loading = ref(false)
onMounted(()=>{
    comment_.value = props.comment
})
const props = defineProps({
    url: {
        required: true,
        type: String
    },
    method: {
        required: true,
        type: String,
        validator(val){
            return ['Patch','Post'].includes(val)
        }
    },
    comment: {
        type: String,
        default: ''
    }
})
const sendComment = () => {
    if(comment_.value.length == 0){
        return
    }
    loading.value = true
    jwtInterceptor({
        url: props.url,
        method: props.method,
        data: {
            text: comment_.value
        }
    }).then(res=>{
        return res.data
    }).then(data=>{
        emit('CommentDone',data)
        loading.value = false
        comment_.value = ''
    }).catch(err=>{
        loading.value = false
        console.log(err)
    })
}
</script>
<style scoped>
.txt{
    border: 1px solid black;
    width: 100%;
}
.fixed-bottom{
    position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: white;
}
</style>