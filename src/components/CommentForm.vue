<template>
    <v-form  @submit.prevent="sendComment">
        <v-text-field
            :label="$t('comment')"
            class="d-inline"
            variant="outlined"
            clearable
            v-model="comment_"
        ></v-text-field>
        <v-btn
            type="submit"
            :text="$t('send')"
            size="x-large"
            color="primary"
        ></v-btn>
    </v-form>
</template>
<script setup>
import jwtInterceptor from '@/axios/auth-axios.instance';
import { onMounted } from 'vue';
import { ref } from 'vue';
const emit = defineEmits(['CommentDone'])
const comment_ = ref('')
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
    }).catch(err=>{
        console.log(err)
    })
}
</script>
<style scoped>
.v-messages{
    min-height: unset;
}
.v-input__details {
    min-height: unset;
    padding-top: unset;
}
.v-btn.v-btn--density-default{
    height: unset;
}
.fixed-bottom{
    position: fixed;
    bottom: 0px;
    width: 100%;
}
</style>