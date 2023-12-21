<template>
    <v-btn size="small" :color="liked ? 'red': 'black'" append-icon="mdi-heart" @click="onLike">
        {{ liked ? $t('unlike') : $t('like') }}
    </v-btn>
</template>
<script setup>
import { watch } from 'vue';
import { useAuthStore } from '@/store/auth';
import { usePostStore } from '@/store/post';
import { computed } from 'vue';
import { ref } from 'vue';
import jwtInterceptor from '@/axios/auth-axios.instance';
import { onMounted } from 'vue';
const AuthStore = useAuthStore()
const PostStore = usePostStore()
const userId = computed(()=>{ return AuthStore.user._id })
const { getPostLikes, removePostLike } = PostStore
const liked = ref(false)
const props = defineProps({
    postId:{
        type: String,
        required: true
    }
})
const emit = defineEmits(['LikedPost'])
const likes = computed(()=>{ return getPostLikes(props.postId) })
const checkLike = (arr,id) => {
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if(element.user != id){
            continue
        }
        liked.value = true
        break
    }
}
onMounted(()=>{
    checkLike(likes.value,userId.value)
})
watch(likes.value,(newValue)=>{
    checkLike(newValue,userId.value)
})
const onLike = () => {
    liked.value ? unlikePost() : likePost()
}
const likePost = () => {
    const {postId} = props
    jwtInterceptor.post(`/likes/post/${postId}`).then(res=>{
        return res.data
    }).then(data=>{
        emit('LikedPost',data)
        liked.value = true
    }).catch(err=>{
        console.log(err)
    })
}
const unlikePost = () => {
    const {postId} = props
    jwtInterceptor.delete(`/likes/post/${postId}`).then(res=>{
        return res.data
    }).then(data=>{
        const { post, _id } = data
        removePostLike(post,_id)
        liked.value = false
    }).catch(err=>{
        console.log(err)
    })
}
</script>