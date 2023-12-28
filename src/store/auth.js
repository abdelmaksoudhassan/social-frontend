// Utilities
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {}
  }),
  getters:{
    id(state){
      return state.user ? state.user._id : null
    },
    name(state){
      return state.user.firstName&&state.user.lastName ? `${state.user.firstName} ${state.user.lastName}` : state.user.email.split('@')[0]
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
    ownedLike(like){
      const { _id } = like.user
      return _id == this.user._id
    },
    ownedPost(post){
      const { _id } = post.owner
      return _id == this.user._id
    }
  }
})