<template>
    <v-snackbar
      v-if="notify"
      :timeout="2000"
    >
      Lorem ipsum dolor sit amet consectetur.
    </v-snackbar>
</template>
<script setup>
defineProps({
    notify:{
        type: Boolean,
        default: false
    }
})
</script>