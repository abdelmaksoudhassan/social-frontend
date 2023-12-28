<template>
    <v-infinite-scroll :items="items" :onLoad="load">
    <template v-for="(item, index) in items" :key="item">
      <Post :post="item"></Post>
    </template>
  </v-infinite-scroll>
</template>
<script setup>
import Post from '@/components/Post.vue'
import { $axios } from '@/axios/axios.instance';
import { usePostStore } from '@/store/post'
import { ref, computed } from 'vue';
const PostStore = usePostStore()
const page = ref(1)
const limit = ref(3)
const items = computed(()=>{ return PostStore.allPosts })
const props = defineProps({
    url: {
        required: true,
        type: String
    }
})
const load = async ({ done }) => {
  const {url} = props
  try{
    const res = (await $axios.get(`${url}?page=${page.value}&limit=${limit.value}`)).data
    PostStore.appendToAllPosts(res)
    page.value++
    done('ok')
  }catch(err){
    console.log(err)
  }
}
</script>