<template>
    <v-btn :size="size" color="success" append-icon="mdi-pencil" @click="openDialog">{{$t('edit')}}</v-btn>
    <Dialog ref="commentsDialog" :title="$('comments')">
        <template #body>
            <CommentForm :comment="comment" method="Patch" :url="url" @CommentDone="onCommentDone"></CommentForm>
        </template>
    </Dialog>
</template>
<script setup>
import { computed, ref } from 'vue';
import { defineAsyncComponent } from 'vue';
const CommentForm = defineAsyncComponent(()=> import('@/components/CommentForm.vue'))
const Dialog = defineAsyncComponent(()=> import('@/components/Dialog.vue'))
const commentsDialog = ref(null)
const emit = defineEmits(['CommentDone'])
const props = defineProps({
    size:{
        type: String,
        default: 'small'
    },
    comment:{
        type: String,
        required: true
    },
    _id:{
        type: String,
        required: true
    }
})
const url = computed(()=>{ return `/comments/${props._id}` })
const openDialog = () => {
    commentsDialog.value.dialog = true
}
const onCommentDone = (val) => {
    commentsDialog.value.dialog = false
    emit('CommentDone',val)
}
</script>