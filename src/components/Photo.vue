<template>
  <img
    class="responsive"
    :src="src"
  />
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  path: {
    required: true,
    type: String
  }
})
const url = import.meta.env.VITE_URL
const src = computed(()=>{ return `${url}/photos/${props.path}` })
</script>
<style scoped>
.responsive {
  max-width: 500px;
  width: 100%;
  height: auto;
}
</style>