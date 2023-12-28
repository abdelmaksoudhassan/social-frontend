<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-icon icon="mdi-dots-horizontal" v-bind="props"></v-icon>
        </template>
        <v-card class="mx-auto">
            <v-list>
                <v-list-item @click="openDialog">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-pencil"></v-icon>
                    </template>
                    <v-list-item-title>{{ $t('edit') }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="deletePost">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-delete"></v-icon>
                    </template>
                    <v-list-item-title>{{ $t('delete') }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-card>
    </v-menu>
    <Dialog ref="editDialog" :title="$t('edit')">
        <template #body>
            <EditPost :postId="post._id" :post-text="post.text" :post-media="post.attached" @PostUpdated="onPostUpdated"></EditPost>
        </template>
    </Dialog>
</template>
<script setup>
import jwtInterceptor from '@/axios/auth-axios.instance';
import { usePostStore } from '@/store/post'
import { defineAsyncComponent, ref } from 'vue';
const Dialog = defineAsyncComponent(()=> import('@/components/Dialog.vue'))
const EditPost = defineAsyncComponent(()=> import('@/components/EditPost.vue'))
const { deletePostByID } = usePostStore()
const editDialog = ref(null)
const props = defineProps({
    post: {
        required: true,
        type: Object
    }
})
const openDialog = () => {
    editDialog.value.dialog = true
}
const onPostUpdated = () => {
    editDialog.value.dialog = false
}
const deletePost = () => {
    const {_id} = props.post
    console.log(_id)
    jwtInterceptor.delete(`/posts/${_id}`).then(res=>{
        return res.data
    }).then(data=>{
        console.log(data)
        deletePostByID(_id)
    }).catch(err=>{
        console.log(err)
    })
}
</script>