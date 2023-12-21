<template>
    <v-card class="my-1">
        <v-card-item class="hvr">
            <!-- <PostHeader
                :firstName="post.owner.firstName"
                :lastName="post.owner.lastName"
                :email="post.owner.email"
                :createdAt="post.createdAt"
                :src="post.owner.avatar"
            ></PostHeader> -->
            <PostHeader :user="post.owner" :createdAt="post.createdAt"></PostHeader>
            <ActionMenu :post="post" v-if="ownedPost(post)"></ActionMenu>
        </v-card-item>
        <v-card-item>
            <p> {{ post.text }} </p>
        </v-card-item>
        <v-card-item>
        <template v-if="post.attached">
            <v-row class="justify-center">
                <!-- <Audio v-if="post.attached.type == 'audio/mpeg'" :path="post.attached.url"></Audio>
                <Video v-else-if="post.attached.type == 'video/mp4'" :path="post.attached.url"></Video>
                <Photo v-else :path="post.attached.url"></Photo> -->
            </v-row>
        </template>
        </v-card-item>
        <v-card-item>
            <div class="d-flex justify-space-between">
                <div class="link" @click="loadComments">
                    {{$t('comments')}} ({{ comments }})
                </div>
                <div class="link" @click="loadLikes">
                    {{$t('likes')}} ({{ likes }})
                </div>
            </div>
        </v-card-item>
        <v-card-actions>
            <v-row class="justify-space-between">
                <LikeBtn :postId="post._id" @likedPost="onLikedPost"></LikeBtn>
                <v-btn size="small" color="surface-variant" variant="text" append-icon="mdi-comment" @click="loadComments">{{$t('comment')}}</v-btn>
            </v-row>
        </v-card-actions>
    </v-card>
    <Dialog ref="commentsDialog" :title="$t('comments')">
        <template #body>
            
                <v-list
                    v-for="comment in postComments"
                >
                <v-card
                class="mx-auto"
            >
            
                    <!-- <v-list-item> -->
                    <!-- <PostHeader
                        :firstName="comment.owner.firstName"
                        :lastName="comment.owner.lastName"
                        :email="comment.owner.email"
                        :createdAt="comment.createdAt"
                        :src="comment.owner.avatar"
                    ></PostHeader> -->
                    <v-card-item class="hvr">
                    <PostHeader :user="comment.owner" :createdAt="comment.createdAt"></PostHeader>
                </v-card-item>
                <v-card-item>
                        <p>{{ comment.text }}</p>
                        <template v-if="ownedComment(comment)">
                            <EditCommentBtn
                             :_id="comment._id"
                             :comment="comment.text"
                             @CommentDone="onCommentUpdated"
                            >
                            </EditCommentBtn>
                            <DeleteBtn 
                                size="small"
                                :_id="comment._id"
                                :url="getUrl(comment._id)"
                                @DeleteDone="onDeleted($event,comment._id)"
                            ></DeleteBtn>
                        </template>
                    </v-card-item>
                    <!-- </v-list-item> -->
                
                </v-card>
                </v-list>
                <CommentForm
                    class="d-flex fixed-bottom"
                    @CommentDone="onCommentAdded"
                    method="Post"
                    :url="'/comments/post/'+post._id"
                >
                </CommentForm>
            
        </template>
    </Dialog>
    <Dialog ref="likesDialog" :title="$t('likes')">
        <template #body>
            <!-- <v-card
                class="mx-auto"
            > -->
                <v-list
                    v-for="liker in postLikes"
                >
                <v-card
                class="mx-auto"
            >
            <v-card-item class="hvr">
                    <!-- <v-list-item> -->
                        <!-- <PostHeader
                        :firstName="liker.user.firstName"
                        :lastName="liker.user.lastName"
                        :email="liker.user.email"
                        :createdAt="liker.createdAt"
                        :src="liker.user.avatar"
                    ></PostHeader> -->
                    <PostHeader :user="liker.user" :createdAt="liker.createdAt"></PostHeader>
                    <!-- </v-list-item> -->
                </v-card-item>
            </v-card>
                </v-list>
        </template>
    </Dialog>
</template>
<script setup>
import { computed, defineAsyncComponent } from 'vue';
import ActionMenu from './ActionMenu.vue';
import { $axios } from '@/axios/axios.instance';
import PostHeader from './PostHeader.vue';
import LikeBtn from './LikeBtn.vue';
import DeleteBtn from './DeleteBtn.vue';
import EditCommentBtn from './EditCommentBtn.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { usePostStore } from '@/store/post';
const show = ref(true)
const CommentForm = defineAsyncComponent(()=> import('./CommentForm.vue'))
const Audio = defineAsyncComponent(()=> import ('./Audio.vue'))
const Video = defineAsyncComponent(()=> import ('./Video.vue'))
const Photo = defineAsyncComponent(()=> import ('./Photo.vue'))
const Dialog = defineAsyncComponent(()=> import ('./Dialog.vue'))
const AuthStore = useAuthStore()
const PostStore = usePostStore()
const { ownedComment,ownedPost } = AuthStore
const { getPostById, addToPostComments } = PostStore
const props = defineProps({
    id:{
        required: true,
        type: String
    }
})
const postComments = ref([])
const commentsDialog = ref(null)
const postLikes = ref([])
const likesDialog = ref(null)

// const src = computed(()=>{ return `https://social-backend-9yb5.onrender.com/avatars/${props.post.owner.avatar}` })
// const name = computed(()=>{ return `${props.post.owner.firstName} ${props.post.owner.lastName}` || props.post.owner.email.split('@')[0]})
const post = computed(()=>{ return getPostById(props.id) })
const comments = computed(()=>{ return post.value.comments.length})
const likes = computed(()=>{ return post.value.likes.length})
const getUrl = (id) => {
    return `comments/${id}/post/${post.value._id}`
}
const onDeleted = ($event,id) => {
    console.log($event,id)
    postComments.value = postComments.value.filter(comment=>comment._id != id)
}
const loadComments = () => {
    commentsDialog.value.dialog = true
    const {_id} = post.value
    $axios.get(`comments/post/${_id}`).then(res=>{
        return res.data
    }).then(data=>{
        postComments.value = data
    }).catch(err=>{
        console.log(err)
    })
}
const onLikedPost = (val) => {
    post.value.likes.push(val)
}
const onCommentAdded = (val) => {
    console.log(val)
    postComments.value.push(val)
    addToPostComments(post.value._id,val._id)
}
const onCommentUpdated = (val) => {
    const {_id} = val
    const index = postComments.value.findIndex(item=>item._id == _id)
    postComments.value[index].text = val.text
}

const loadLikes = () => {
    likesDialog.value.dialog = true
    const {_id} = post.value
    $axios.get(`likes/post/${_id}`).then(res=>{
        return res.data
    }).then(data=>{
        postLikes.value = data
    }).catch(err=>{
        console.log(err)
    })
}
</script>
<style scoped>
.link:hover{
    text-decoration:underline;
    cursor: pointer;
}
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
.hvr:hover{
    cursor: pointer;
    background-color: rgb(227, 227, 227);
}
</style>