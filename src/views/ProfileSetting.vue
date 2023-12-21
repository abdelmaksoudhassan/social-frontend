<template>
  <v-card
    class="mx-auto my-2"
  >
  <v-card-text>
  <PostHeader
    :email="user.email"
    :firstName="user.firstName"
    :lastName="user.lastName"
    :src="avatarPath"
    :createdAt="user.updatedAt" 
  ></PostHeader>
</v-card-text>
  </v-card>
  <v-card
    class="mx-auto my-2"
    prepend-icon="mdi-pencil"
  >
    <template v-slot:title>
      {{ $t("changeName") }}
    </template>
    <v-card-text>
        <v-form v-model="valid" @submit.prevent="changeName">
            <v-row>
                <v-col
                cols="12"
                sm="6"
                >
                <v-text-field
                    v-model="firstname"
                    :rules="firstNameRules"
                    :counter="25"
                    :label="$t('name')"
                    required
                ></v-text-field>
                </v-col>

                <v-col
                cols="12"
                sm="6"
                >
                <v-text-field
                    v-model="lastname"
                    :rules="lastNameRules"
                    :counter="25"
                    :label="$t('family')"
                    required
                ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn type="submit" color="primary" class="mt-2" :disabled="!valid">{{$t('save')}}</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card-text>
  </v-card>
  <v-card
    class="mx-auto my-2"
    prepend-icon="mdi-camera"
  >
    <template v-slot:title>
      {{ $t('avatar') }}
    </template>

    <v-card-text>
      <v-form v-model="validAvatar" @submit.prevent="changeAvatar">
      <v-file-input
        :rules="rules"
        v-model="avatar"
        accept="image/png, image/jpeg, image/jpg"
        :label="'(png, jpg, jpeg) '+$('only')"
      >
      </v-file-input>
      <v-btn type="submit" color="primary" class="mt-2" :disabled="!validAvatar">{{$t('save')}}</v-btn>
    </v-form>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { useVuelidate } from '@vuelidate/core'
import { minLength, maxLength, alpha } from '@vuelidate/validators'
import jwtInterceptor from '@/axios/auth-axios.instance';
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useI18n } from 'vue-i18n';
import PostHeader from '@/components/PostHeader.vue';
import { computed } from 'vue';
const AuthStore = useAuthStore()
const { t } = useI18n()
const user = computed(()=>{ return AuthStore.user })
const avatarPath = computed(()=>{ return AuthStore.avatarPath })
const valid = ref(false)
const validAvatar = ref(false)
const firstname =ref('')
const lastname = ref('')
const name_rules = {
    minLength: minLength(3),
    maxLength: maxLength(25),
    alpha
}
const firstname$ = useVuelidate(name_rules, firstname)
const lastname$ = useVuelidate(name_rules, lastname)
const firstNameRules = [
    () => {     
        if (! firstname$.value.$invalid && firstname.value.length != 0) return true

        return t('nameMessage')
    }
]
const lastNameRules = [
    () => {     
        if (! lastname$.value.$invalid && lastname.value.length != 0) return true

        return t('nameMessage')
    }
]
const avatar = ref([])
const rules = [
  () => {
    if(avatar.value.length != 0) return true

    return t('uploadImage')
  },
  value => {
    return !value || !value.length || value[0].size < 1024*1024 || t('memoryMessage')
  },
]
const changeName = () => {
    const form = { firstName: firstname.value, lastName: lastname.value }
    jwtInterceptor.patch('/auth/user-name',{...form}).then(res=>{
        return res.data
    }).then(data=>{
        AuthStore.$patch({user: data})
    }).catch(err=>{
        console.log(err)
    })
}
const changeAvatar = () => {
  const file = avatar.value[0]
  const formData = new FormData()
  formData.append('avatar',file)
  jwtInterceptor.patch('/auth/avatar',formData).then(res=>{
    return res.data
  }).then(data=>{
    AuthStore.$patch({ user: data })
  }).catch(err=>{
    console.log(err)
  })
}
</script>