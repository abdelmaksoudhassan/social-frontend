<template>
    <v-card>
        <v-row no-gutters justify="space-between">
            <v-col class="d-flex justify-center align-center">
                <v-avatar
                    size="125"
                    rounded="5"
                >
                    <v-img :src="path"></v-img>
                </v-avatar>
                <v-btn @click="waveUser" v-if="! myProfile" color="deep-purple" class="ma-3" prepend-icon="mdi-rocket">{{ $t('wave') }}</v-btn>
            </v-col>
            <v-col class="d-flex justify-center align-center">
                <div>
                    <v-card-title class="text-h5">
                        {{ name }}
                    </v-card-title>

                    <v-card-subtitle>{{ user.email }}</v-card-subtitle>

                    <v-card-actions>
                        <v-list lines="one">
                            <v-list-item
                                :title="$t('from')"
                                :subtitle="$filters.fromNow(new Date(user.createdAt))"
                            ></v-list-item>
                            <v-list-item
                                :title="$t('lastUpdate')"
                                :subtitle="$filters.fromNow(new Date(user.updatedAt))"
                            ></v-list-item>
                        </v-list>
                    </v-card-actions>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>
<script setup>
import { $axios } from '@/axios/axios.instance';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { io } from '@/helpers/socket-io';
import { useAuthStore } from '@/store/auth';
const AuthStore = useAuthStore()
const Route = useRoute()
const user = (await $axios.get(`/auth/user/${Route.params.id}`)).data
const path = computed(()=>{
    const url = import.meta.env.VITE_URL
    const defaultUrl = import.meta.env.VITE_DUMMY
    return user.avatar ? `${url}/avatars/${user.avatar}` : defaultUrl
})
const name = computed(()=>{
    const nameVal = (user.firstName && user.lastName) ? `${user.firstName} ${user.lastName}` : user.email.split('@')[0]
    return nameVal
})
const myProfile = computed(()=>{ return AuthStore.ownedProfile(Route.params.id)})
const waveUser = () => {
    io.emit('wave',{room: Route.params.id, user: AuthStore.name})
}
</script>