<template>
  <component :is="currentComponent" @PostSaved="onPostSaved" v-bind="currentProperties"></component>
  <v-infinite-scroll :items="items" :onLoad="load">
    <template v-for="(item, index) in items" :key="item">
      <Post :id="item._id"></Post>
    </template>
  </v-infinite-scroll>
</template>
<script setup>
import NewPost from '@/components/NewPost.vue'
import { shallowRef, computed, defineAsyncComponent } from 'vue';
import { reactive, ref } from 'vue';
import { $axios } from '@/axios/axios.instance';
import { usePostStore } from '@/store/post'
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
import Post from '@/components/Post.vue'
const Done = defineAsyncComponent(()=> import ('@/components/Done.vue'))
const PostStore = usePostStore()
const postData = reactive({ text: '' })
const currentComponent = shallowRef(NewPost)
const page = ref(1)
const limit = ref(3)
const currentProperties = computed(()=>{
    return { header: t('published'), body: postData.text, url: '/posts', action: 'post' }
})
const items = computed(()=>{ return PostStore.allPosts })
function onPostSaved(val){
    currentComponent.value = Done
    postData.text = val.text
    setTimeout(()=>{
      currentComponent.value = NewPost
    },2000)
}
const load = async ({ done }) => {
  try{
    const res = (await $axios.get(`/posts?page=${page.value}&limit=${limit.value}`)).data
    PostStore.appendToAllPosts(res)
    page.value++
    done('ok')
  }catch(err){
    console.log(err)
  }
}
</script>