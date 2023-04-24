<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
import axios from 'axios';

export default {
    data() {
        return {
            url: 'https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=i56xfcop7yir1r2zfrewswoef3wux7iwm3in1myx9weeoswg4',
            wotd: { definitions: [{ partOfSpeech: '', text: '' }], word: '' },
        };
    },
    methods: {
        flipCard() {
            let card = document.querySelector('.flip-card');
            card.classList.toggle('clicked');
        },
        loadWotd() {
            axios
                .get(this.url + '&apiKey=c279ca20e57f4c47a810032b6b52a48f')
                .then((response) => {
                    this.wotd = response.data;
                })
                .catch((err) => alert(err));
        },
    },
    computed: {},
    mounted() {
        this.loadWotd();
    },
};
</script>

<template>
    <div class="words-menu">
        <div class="row">
            <div class="flip-card p-4" @click="flipCard">
                <div class="flip-card-inner">
                    <div class="flip-card-front p-3">
                        <h3>Word Of The Day<br />Tap to reveal!</h3>
                        <img class="mee-img-front" src="/src/assets/mee/main.png" />
                    </div>
                    <div class="flip-card-back p-4">
                        <p>Word Of The Day</p>
                        <h4 class="word mt-2">{{ wotd.word }}</h4>
                        <h5 class="mb-3">{{ wotd.definitions[0].partOfSpeech }}</h5>
                        <p>{{ wotd.definitions[0].text }}</p>
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
    overflow: hidden;
}

.flip-card-back:hover {
    overflow: auto;
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

.mee-img-front {
    width: 150px;
    height: auto;
}
</style>
