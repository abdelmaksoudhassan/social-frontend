<template>
    <Suspense>
        <ProfileHeader></ProfileHeader>
        <template #fallback>
            <v-skeleton-loader
                class="mx-auto border"
                type="card-avatar, actions"
            ></v-skeleton-loader>
        </template>
    </Suspense>
    <PostScroller :url="url"></PostScroller>
</template>
<script setup>
import PostScroller from '@/components/PostScroller.vue';
import ProfileHeader from '@/components/ProfileHeader.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { usePostStore } from '@/store/post';
onMounted(()=>{ usePostStore().$reset() })
const Route = useRoute()
const url = computed(()=>{ return `/posts/user/${Route.params.id}` })
</script>