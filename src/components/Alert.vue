<template>
    <v-alert :color="color" variant="outlined">
        <div ref="element">
            {{ msg }}
        </div>
    </v-alert>
</template>
<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';

const element = ref(null)
const props = defineProps({
    msg:{
        default: null,
        type: String
    },
    color:{
        default: 'error',
        type: String
    },
    direction:{
        default: 'left',
        type: String,
        validator(value) {
            return ['left', 'right'].includes(value)
        }
    }
})
onMounted(()=>{
    const { direction } = props
    direction == 'left' ? element.value.style.direction = 'ltr' : element.value.style.direction = 'rtl'
 })
</script>