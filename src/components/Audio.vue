<template>
    <audio id="audioPlayer" controls autoplay muted>
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
const url = import.meta.env.VITE_URL
const src = computed(()=>{ return `${url}/media/${props.path}` })
onMounted(()=>{
    window.addEventListener('load', audioScroll);
    window.addEventListener('scroll', audioScroll);
})
function audioScroll() {
    if ( document.querySelectorAll('audio[autoplay]').length > 0) {
        var windowHeight = window.innerHeight,
            audioEl = document.querySelectorAll('audio[autoplay]');

        for (var i = 0; i < audioEl.length; i++) {
            var thisAudioEl = audioEl[i],
                audioHeight = thisAudioEl.clientHeight,
                audioClientRect = thisAudioEl.getBoundingClientRect().top;
            if ( audioClientRect <= ( (windowHeight*.6) - (audioHeight*.5) ) && audioClientRect >= ( windowHeight*.3 ) ) {
                thisAudioEl.play();
            } else {
                thisAudioEl.pause();
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