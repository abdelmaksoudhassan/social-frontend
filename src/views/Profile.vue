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
    <Suspense>
        <UserPosts></UserPosts>
        <template #fallback> loading... </template>
    </Suspense>
</template>
<script setup>
import ProfileHeader from '@/components/ProfileHeader.vue';
import UserPosts from '@/components/UserPosts.vue';
</script>