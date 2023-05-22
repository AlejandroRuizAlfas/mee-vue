<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
import axios from 'axios';

import DictionaryWord from '../components/DictionaryWord.vue';
import Loading from '../components/Loading.vue';
export default {
    components: {
        DictionaryWord,
        Loading,
    },
    data() {
        return {
            word: '',
            showComponent: false,
            isLoading: false,
        };
    },
    methods: {
        ...mapActions(useStore, ['setWord']),
        animateBar() {
            const container = document.querySelector('.center-bar');
            container.style.transition = 'margin 1000ms';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            container.classList.add('open');
            setTimeout(this.displayWord, 1000);
        },
        async displayWord() {
            this.isLoading = true;
            setTimeout(async () => {
                this.setWord(this.word);
                this.showComponent = true;
                this.isLoading = false;
            }, 1000);
        },
    },
    computed: {},
    mounted() {},
};
</script>

<template>
    <div class="container-fluid justify-content-center" style="padding-top: 20px">
        <div class="center-bar">
            <h1 class="text-center m-4 meectionary">Meectionary</h1>
            <div class="search-wrapper">
                <div class="input-field">
                    <input id="search-input" class="search-input" type="text" placeholder="Search for any word..." v-model="word" />
                    <button class="btn-search" type="submit" @click="animateBar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="isLoading">
            <Loading />
        </div>
        <div v-else class="word-component">
            <DictionaryWord v-if="showComponent" />
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap');
.container-fluid {
    /* background-color: #233d4d;
    height: 100vh; */
    overflow: auto;
}
.search-wrapper {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}

.search-form {
    display: flex;
    align-items: center;
    width: 100%;
}

.input-field {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
}

.btn-search {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    background-color: #f8f8f8;
    border: none;
    outline: none;
    border-radius: 0 40px 40px 0;
    height: 60px;
    width: 80px;
}

.btn-search:hover {
    background-color: #e2e2e2;
}

.search-input {
    width: 100%;
    height: 60px;
    padding: 8px;
    border: none;
    outline: none;
    border-radius: 40px 0 0 40px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 20px;
    padding-left: 2rem;
}

.meectionary {
    font-family: 'Poppins', sans-serif;
    color: white;
    font-size: 72px;
}
.center-bar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30vh;
}
.center-bar.open {
    margin-top: 0;
}
.hidden {
    display: none;
}

@media only screen and (max-width: 550px) {
    .meectionary {
        font-size: 52px;
    }
}
</style>
