<template>
    <div class="d-flex align-center">
        <div>
            <Avatar :src="path"></Avatar>
        </div>
        <div>
            <div @click="visitProfile" class="hvr">{{ name }}</div>
            <div class="font-weight-light text-subtitle-2">
                {{ $filters.fromNow(new Date(createdAt)) }}
            </div>
        </div>
    </div>
</template>
<script setup>
import Avatar from './Avatar.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const Router = useRouter()
const props = defineProps({
    user:{
        type: Object,
        required: true
    },
    createdAt:{
        required: true
    }
})
const path = computed(()=>{
    const url = import.meta.env.VITE_URL
    const defaultUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    const photo = props.user.avatar ? `${url}/avatars/${props.user.avatar}` : defaultUrl
    return photo
})
const name = computed(()=>{
    if(props.user.firstName && props.user.lastName){
        return `${props.user.firstName} ${props.user.lastName}`
    }else if(props.user.email && !props.user.firstName && !props.user.lastName){
        return props.user.email.split('@')[0]
    }else{
        return 'Anonymous User'
    }
})
const visitProfile = () => {
    const {_id} = props.user
    Router.push({path: `/main/profile/${_id}`})
}
</script>
<style scoped>
.hvr:hover{
    cursor: pointer;
    text-decoration: underline;
}
</style>