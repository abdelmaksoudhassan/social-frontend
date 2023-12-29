<template>
  <v-app-bar
    class="bg-deep-purple"
    prominent
  >
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <div class="d-flex flex-column justify-center align-center ma-4">
      <div>-</div>
      <LanguageSwitch></LanguageSwitch>
    </div>
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
      <v-list-item prepend-icon="mdi-arrow-down" :title="$t('logout')" value="starred" :to="{name: 'Home'}" @click="onLogout"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup>
import LanguageSwitch from '@/components/LanguageSwitch.vue';
import { io } from '@/helpers/socket-io';
import { useAuthStore } from '@/store/auth'
import { computed } from 'vue';
import { ref } from 'vue';
import { useCookies } from 'vue3-cookies';
const AuthStore = useAuthStore()
const { cookies } = useCookies()
const drawer = ref(false)
const id = computed(()=>{ return AuthStore.id })
const onLogout = () => {
  cookies.remove('Access-Token')
  cookies.remove('Refresh-Token')
  AuthStore.$reset()
  io.disconnect()
}
</script>