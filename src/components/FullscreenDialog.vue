<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        block
        color="success"
        dark
        v-bind="props"
      >
        {{ title }}
      </v-btn>
    </template>
    <v-card>
      <v-toolbar
        dark
        color="success"
      >
        <v-btn
          icon
          dark
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <slot name="body"></slot>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref } from 'vue';
const dialog = ref(false)
defineExpose({ dialog })
defineProps({
  title:{
    type: String,
    required: true
  }
})
</script>
<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>