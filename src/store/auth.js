// Utilities
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {}
  }),
  getters:{
    avatarPath(state){
      const url = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      return (state.user && state.user.avatar) ? state.user.avatar : url
    }
  },
  actions:{
    setUser(user){
      this.user = user
    },
    ownedComment(comment){
      const { _id } = comment.owner
      return _id == this.user._id
    },
    ownedPost(post){
      const { _id } = post.owner
      return _id == this.user._id
    }
  }
})