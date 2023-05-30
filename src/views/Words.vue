<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
import axios from 'axios';

import WordOfTheDay from '../components/WordOfTheDay.vue';

export default {
    components: {
        WordOfTheDay,
    },
    data() {
        return {};
    },
    methods: {
        openTranslator() {
            this.$router.push('/translator');
        },
        openDictionary() {
            this.$router.push('/dictionary');
        },
    },
    computed: {},
    mounted() {},
};
</script>

<template>
    <div class="container-fluid justify-content-center" style="padding-top: 20px">
        <div class="words-content">
            <WordOfTheDay />
            <div class="row justify-content-center">
                <div class="translator-card p-4">
                    <div class="translator-inner mx-auto pt-3" @click="openTranslator">
                        <img src="/src/assets/sidemenu/translate.png" class="menu-img" />
                        <h3>Translator</h3>
                    </div>
                </div>
                <div class="dictionary-card p-4">
                    <div class="dictionary-inner mx-auto pt-3" @click="openDictionary">
                        <img src="/src/assets/sidemenu/dictionary.png" class="menu-img" />
                        <h3>Dictionary</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap');
.container-fluid {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    height: 100vh;
}

h3 {
    font-family: 'Poppins', sans-serif;
}

.translator-card,
.dictionary-card {
    height: 300px;
    width: 300px;
    border-radius: 20px;
}

.translator-card:hover,
.dictionary-card:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease-in-out;
}

.translator-inner,
.dictionary-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: #ffdbac;
    border-radius: 20px;
    display: grid;
    place-items: center;
}
.translator-inner {
    background-color: #aa94cf;
}
.menu-img {
    width: 150px;
    height: auto;
}
</style>
