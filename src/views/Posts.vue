<template>
  <component :is="currentComponent" @PostSaved="onPostSaved" v-bind="currentProperties"></component>
  <PostScroller url="/posts"></PostScroller>
</template>
<script setup>
import NewPost from '@/components/NewPost.vue'
import PostScroller from '@/components/PostScroller.vue';
import { usePostStore } from '@/store/post';
import { onMounted } from 'vue';
import { shallowRef, computed, defineAsyncComponent } from 'vue';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
const Done = defineAsyncComponent(()=> import ('@/components/Done.vue'))
const postData = reactive({ text: '' })
const currentComponent = shallowRef(NewPost)
onMounted(()=>{ usePostStore().$reset() })
const currentProperties = computed(()=>{
    return { header: t('published'), body: postData.text, url: '/posts', action: 'post' }
})
function onPostSaved(val){
    currentComponent.value = Done
    postData.text = val.text
    setTimeout(()=>{
      currentComponent.value = NewPost
    },2000)
}
</script>