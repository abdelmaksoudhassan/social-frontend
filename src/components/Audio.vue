<template>
    <audio id="audioPlayer" controls autoplay>
        <source :src="src" type="audio/mp3" />
    </audio>
</template>
<script setup>
import { computed, onMounted } from 'vue';

const props = defineProps({
    path: {
        required: true,
        type: String
    }
})
const src = computed(()=>{ return `https://social-backend-9yb5.onrender.com/media/${props.path}` })
onMounted(()=>{
    window.addEventListener('load', videoScroll);
    window.addEventListener('scroll', videoScroll);
})
function videoScroll() {
    if ( document.querySelectorAll('audio[autoplay]').length > 0) {
        var windowHeight = window.innerHeight,
            videoEl = document.querySelectorAll('audio[autoplay]');

        for (var i = 0; i < videoEl.length; i++) {
            var thisVideoEl = videoEl[i],
                videoHeight = thisVideoEl.clientHeight,
                videoClientRect = thisVideoEl.getBoundingClientRect().top;
            if ( videoClientRect <= ( (windowHeight*.6) - (videoHeight*.5) ) && videoClientRect >= ( windowHeight*.3 ) ) {
                thisVideoEl.play();
            } else {
                thisVideoEl.pause();
            }
        }
    }

}
</script>
<style scoped>
audio{
  max-width: 500px;
  width: 100%;
}
</style>