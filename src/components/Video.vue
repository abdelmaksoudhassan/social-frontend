<template>
    <video id="videoPlayer" controls autoplay muted>
        <source :src="src" type="audio/mp4" />
    </video>
</template>
<script setup>
import { onMounted } from 'vue';
import { computed } from 'vue';

const props = defineProps({
    path: {
        required: true,
        type: String
    }
})
const url = import.meta.env.VITE_URL
const src = computed(()=>{ return `${url}/media/${props.path}` })
onMounted(()=>{
    window.addEventListener('load', videoScroll);
    window.addEventListener('scroll', videoScroll);
})
function videoScroll() {
    if ( document.querySelectorAll('video[autoplay]').length > 0) {
        var windowHeight = window.innerHeight,
            videoEl = document.querySelectorAll('video[autoplay]');

        for (var i = 0; i < videoEl.length; i++) {
            var thisVideoEl = videoEl[i],
                videoHeight = thisVideoEl.clientHeight,
                videoClientRect = thisVideoEl.getBoundingClientRect().top;
            if ( videoClientRect <= ( (windowHeight) - (videoHeight*.5) ) && videoClientRect >= ( 0 - ( videoHeight*.3 ) ) ) {
                thisVideoEl.play();
            } else {
                thisVideoEl.pause();
            }
        }
    }

}
</script>
<style scoped>
video {
  max-width: 500px;
  width: 100%;
  height: auto;
}</style>