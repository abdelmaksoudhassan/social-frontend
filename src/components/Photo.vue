<template>
  <v-img
    class="mx-auto"
    height="auto"
    max-width="500"
    :src="src"
  ></v-img>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  path: {
    required: true,
    type: String
  }
})
const src = computed(()=>{ return `https://social-backend-9yb5.onrender.com/photos/${props.path}` })
</script>