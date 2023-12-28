<template>
  <router-view />
</template>
<script>
import jwtInterceptor from './axios/auth-axios.instance';
import { useAuthStore } from './store/auth';
import { mapActions } from 'pinia';
import { io } from '@/helpers/socket-io'
export default{
  created(){
    jwtInterceptor.post('/auth/auto-login').then(res=>{
      return res.data
    }).then(data=>{
      this.setUser(data)
      const { _id } = data
      io.connect()
      io.emit('join',_id)
    }).catch(err=>{
      console.log(err)
    })
  },
  methods:{
    ...mapActions(useAuthStore,['setUser']),
  }
}
</script>