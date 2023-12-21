<template>
    <div class="d-flex justify-space-between align-center" @click="visitProfile">
        <div class="d-sm-flex align-center">
            <Avatar :src="path"></Avatar>
            <div class="ma-2">{{ name }}</div>
        </div>
        <div>
            {{ $filters.fromNow(new Date(createdAt)) }}
        </div>
    </div>
    <!-- <v-list-item
    :title="name"
    :subtitle="$filters.fromNow(new Date(createdAt))"
    :prepend-avatar="path"
  ></v-list-item> -->
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
        // type: String,
        required: true
    },
    // src:{
        // type: String,
    //     required: true
    // },
    // firstName:{
        // type: String,
    //     required: true
    // },
    // lastName:{
        // type: String,
    //     required: true
    // },
    // email:{
        // type: String,
    //     required: true
    // },
})
const path = computed(()=>{ return `https://social-backend-9yb5.onrender.com/avatars/${props.user.avatar}` })
const name = computed(()=>{ return `${props.user.firstName} ${props.user.lastName}` || props.user.email.split('@')[0]})
const visitProfile = () => {
    const {_id} = props.user
    Router.push({path: `/main/profile/${_id}`})
}
</script>
<!-- <style scoped>
.hvr:hover{
    cursor: pointer;
    background-color: rgb(227, 227, 227);
}
</style> -->