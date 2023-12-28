<template>
  <v-app>
    <default-bar />
    <v-snackbar
      v-model="snackbar"
      timeout="2000"
    >
      {{ text }}
    </v-snackbar>
    <default-view />
  </v-app>
</template>

<script setup>
  import { ref } from 'vue';
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import { onMounted } from 'vue';
  import { io } from '@/helpers/socket-io';
  import { usePostStore } from '@/store/post';
  import { useAuthStore } from '@/store/auth';
  const snackbar = ref(false)
  const text = ref(null)
  const PostStore = usePostStore()
  const AuthStore = useAuthStore()
  onMounted(()=>{
    io.on('WaveMessage',(user)=>{
      snackbar.value = true
      text.value = `${user} waves you`
    })
    io.on('PostAdded',(post)=>{
      snackbar.value = true
      text.value = 'New Post Added'
      PostStore.addPost(post)
    })
    io.on('PostDeleted',(data)=>{
      const { id } = data
      PostStore.deletePostByID(id)
      snackbar.value = true
      text.value = 'One Post Deleted'
    })
    io.on('PostEdited',(post)=>{
      PostStore.updatePost(post)
      snackbar.value = true
      text.value = 'One Post Updated'
    })
    io.on('NewComment',(data)=>{
      const { post, comment } = data
      if(! AuthStore.ownedComment(comment._id)){
        PostStore.addToPostComments(post,comment)
        snackbar.value = true
        text.value = 'New Comment On Your Post'
      }
    })
    io.on('NewLike',(data)=>{
      if(! AuthStore.ownedLike(data)){
        snackbar.value = true
        text.value = 'New Like On Your Post'
      }
    })
  })
</script>
