<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';

export default {
    data() {
        return {};
    },
    methods: {
        flipCard() {
            let card = document.querySelector('.flip-card');
            card.classList.toggle('clicked');
        },
    },
    computed: {},
};
</script>

<template>
    <div class="words-menu">
        <div class="row">
            <div class="flip-card p-4" @click="flipCard">
                <div class="flip-card-inner">
                    <div class="flip-card-front p-3">
                        <h3>Word Of The Day<br />Tap to reveal!</h3>
                        <img src="/src/assets/mee/main.png" width="150px" height="auto" />
                    </div>
                    <div class="flip-card-back p-4">
                        <p>Word Of The Day</p>
                        <h4 class="word mt-2">Oneiromancy</h4>
                        <h5 class="mb-3">noun</h5>
                        <p>Divination through dreams. the art of taking omens from dreams</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.words-menu {
    display: grid;
    place-items: center;
    animation: shake-reveal 1s ease-in-out;
    animation-fill-mode: forwards;
    opacity: 0;
}

h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 25px;
}

@keyframes shake-reveal {
    0% {
        transform: translateX(0);
        opacity: 0;
    }
    25% {
        transform: translateX(-5px);
    }
    50% {
        transform: translateX(5px);
    }
    75% {
        transform: translateX(-5px);
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

.flip-card {
    background-color: transparent;
    width: 300px;
    height: 300px;
    perspective: 1000px;
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 2s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.flip-card.clicked .flip-card-inner {
    transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.flip-card-front {
    background-color: white;
    color: black;
    border-radius: 20px;
}

.flip-card-back {
    background-color: #2980b9;
    color: white;
    transform: rotateY(180deg);
    border-radius: 20px;
}
</style>
