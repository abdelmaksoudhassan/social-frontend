<template>
    <v-card>
        <div class="d-flex flex-sm-col justify-space-between align-center">
            <div>
            <v-card-title class="text-h5">
                {{ user.firstName }} {{ user.lastName }}
            </v-card-title>

            <v-card-subtitle>{{ user.email }}</v-card-subtitle>

            <v-card-actions>
                <v-list lines="one">
                    <v-list-item
                        :title="$t('from')"
                        :subtitle="$filters.fromNow(new Date(user.createdAt))"
                    ></v-list-item>
                    <v-list-item
                        :title="$t('lastUpdated')"
                        :subtitle="$filters.fromNow(new Date(user.updatedAt))"
                    ></v-list-item>
                </v-list>
            </v-card-actions>
            </div>

            <v-avatar
            class="ma-3"
            size="125"
            rounded="0"
            >
            <v-img :src="'https://social-backend-9yb5.onrender.com/avatars/'+user.avatar"></v-img>
            </v-avatar>
        </div>
    </v-card>
</template>
<script setup>
import { $axios } from '@/axios/axios.instance';
import { useRoute } from 'vue-router';
const Route = useRoute()
const user = (await $axios.get(`/auth/user/${Route.params.id}`)).data
</script>