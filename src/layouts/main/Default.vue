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
  import { useI18n } from 'vue-i18n';
  const PostStore = usePostStore()
  const AuthStore = useAuthStore()
  const { t } = useI18n()
  const snackbar = ref(false)
  const text = ref(null)
  onMounted(()=>{
    io.on('WaveMessage',(user)=>{
      snackbar.value = true
      text.value = `${user} ${t("wavesYou")}`
    })
    io.on('PostAdded',(post)=>{
      snackbar.value = true
      text.value = `${t('newPost')}`
      PostStore.addPost(post)
    })
    io.on('PostDeleted',(data)=>{
      const { id } = data
      PostStore.deletePostByID(id)
      snackbar.value = true
      text.value = `${t('postDeleted')}`
    })
    io.on('PostEdited',(post)=>{
      PostStore.updatePost(post)
      snackbar.value = true
      text.value = `${t('postEdited')}`
    })
    io.on('NewComment',(data)=>{
      const { comment } = data
      if(! AuthStore.ownedComment(comment._id)){
        snackbar.value = true
        text.value = `${t('newCommentOnYourPost')}`
      }
    })
    io.on('NewLike',(data)=>{
      if(! AuthStore.ownedLike(data)){
        snackbar.value = true
        text.value = `${t('newLikeOnYourPost')}`
      }
    })
  })
</script>