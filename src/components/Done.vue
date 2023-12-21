<template>
  <v-sheet
    max-width="600"
    class="pa-4 text-center mx-auto"
  >
    <v-icon
      class="mb-5"
      color="success"
      icon="mdi-check-circle"
      size="112"
    ></v-icon>

    <h2 class="text-h5 mb-6">{{ header }}</h2>

    <p class="mb-4 text-medium-emphasis text-body-2">
      {{ body }}
    </p>
  </v-sheet>
</template>
<script setup>
defineProps({
  header:{
    required: true,
    type: String
  },
  body:{
    required: true,
    type: String
  }
})
</script>