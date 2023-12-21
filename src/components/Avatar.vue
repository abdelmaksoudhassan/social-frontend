<template>
    <v-img
        :width="size"
        :height="size"
        cover
        class="rounded-circle"
        :src= "src"
    ></v-img>
</template>
<script setup>
defineProps({
    size:{
        type: Number,
        default: 50
    },
    src:{
        type: String,
        default: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
})
</script>