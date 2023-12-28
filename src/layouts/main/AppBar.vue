<template>
  <v-app-bar
    class="bg-deep-purple"
    prominent
  >
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <!-- <v-toolbar-title>My files</v-toolbar-title> -->

    <v-spacer></v-spacer>

    <!-- <v-btn variant="text" icon="mdi-magnify"></v-btn> -->
    <LanguageSwitch></LanguageSwitch>

    <!-- <v-btn variant="text" icon="mdi-filter"></v-btn> -->

    <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    location="bottom"
    temporary
  >
    <v-list>
      <v-list-item prepend-icon="mdi-post" :title="$t('posts')" value="myfiles" :to="{name: 'Posts'}"></v-list-item>
      <v-list-item prepend-icon="mdi-wrench" :title="$t('setting')" value="shared" :to="{name:'Setting'}"></v-list-item>
      <v-list-item prepend-icon="mdi-account" :title="$t('profile')" value="starred" :to="`/main/profile/${id}`"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup>
import LanguageSwitch from '@/components/LanguageSwitch.vue';
import { useAuthStore } from '@/store/auth'
import { computed } from 'vue';
import { ref } from 'vue';
const AuthStore = useAuthStore()
const drawer = ref(false)
const id = computed(()=>{ return AuthStore.id })
</script>