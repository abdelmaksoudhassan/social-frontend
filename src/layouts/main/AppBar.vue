<template>
  <v-app-bar
    class="bg-deep-purple"
    theme="dark"
    prominent
  >
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>My files</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- <v-btn variant="text" icon="mdi-magnify"></v-btn> -->
    <LanguageSwitch></LanguageSwitch>

    <v-btn variant="text" icon="mdi-filter"></v-btn>

    <!-- <v-btn variant="text" icon="mdi-dots-vertical"></v-btn> -->
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    location="bottom"
    temporary
  >
    <v-list>
      <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
      <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import LanguageSwitch from '@/components/LanguageSwitch.vue';
  export default {
    components: { LanguageSwitch },
    data: () => ({
      drawer: false,
      group: null,
      items: [
        {
          title: 'Foo',
          value: 'foo',
          to: 'about'
        },
        {
          title: 'Bar',
          value: 'bar',
        },
        {
          title: 'Fizz',
          value: 'fizz',
        },
        {
          title: 'Buzz',
          value: 'buzz',
        },
      ],
    }),
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>