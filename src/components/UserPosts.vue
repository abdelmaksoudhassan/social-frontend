<template>
    {{ posts }}
</template>
<script setup>
import { $axios } from '@/axios/axios.instance';
import { useRoute } from 'vue-router';
const Route = useRoute()
const posts = (await $axios.get(`/posts/user/${Route.params.id}`)).data
</script>