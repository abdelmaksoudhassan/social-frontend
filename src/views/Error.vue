<template>
    <v-app>
        <v-main>
        <v-Container class="h-100">
            <LanguageSwitch></LanguageSwitch>
            <div class="d-flex flex-column justify-center align-center h-100">
                <v-icon color="error" icon="mdi-alert" size="100"></v-icon>
                <div class="text-h4 text-red">
                    {{  $t("wrongUrl")  }}
                </div>
                <router-link :to="{ name: 'Home' }">{{ $t("toHome") }}</router-link>
            </div>
            </v-Container>
        </v-main>
    </v-app>
</template>
<script setup>
import LanguageSwitch from '@/components/LanguageSwitch.vue';
</script>