import { defineStore } from "pinia";

export const usePostStore = defineStore('post',{
    state:()=>({
        allPosts: []
    }),
    actions:{
        setAllPosts(data){
            this.allPosts = data
        },
        addPost(post){
            this.allPosts.unshift(post)
        },
        getPostById(id){
            const filter = this.allPosts.filter(item=>item._id == id)
            return filter[0]
        },
        appendToAllPosts(arr){
            this.allPosts.push(...arr)
        },
        getPostLikes(id){
            const post = this.allPosts.filter(item=>item._id == id)
            if(post.length == 0) return []
            const {likes} = post[0]
            return likes
        },
        removePostLike(post,_id){
            const array = this.allPosts
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                if(element._id != post) continue
                element.likes = element.likes.filter(like=>like._id != _id)
            }
        },
        deletePostByID(id){
            this.allPosts = this.allPosts.filter(item=> item._id != id)
        },
        addToPostComments(_id,comment){
            const index = this.allPosts.findIndex(item=>item._id == _id)
            this.allPosts[index].comments.push(comment)
        },
        addToPostLikes(like){
            const { post } = like 
            const index = this.allPosts.findIndex(item=>item._id == post)
            this.allPosts[index].likes.push(like)
        },
        updatePost(post){
            const index = this.allPosts.findIndex(item=>item._id == post._id)
            this.allPosts[index] = post
        }
    }
})