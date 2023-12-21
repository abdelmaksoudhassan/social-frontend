<template>
  <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
    <v-card>
        <v-toolbar
          dark
          color="deep-purple"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <span>{{ title }}</span>
        </v-toolbar>
        <v-list
          lines="two"
          subheader
        >
            <slot name="body"></slot>
        </v-list>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref } from 'vue';
const dialog = ref(false)
defineExpose({
  dialog
})
defineProps({
  title:{
    type: String,
    required: true
  }
})
</script>