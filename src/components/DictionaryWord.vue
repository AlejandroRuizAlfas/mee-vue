<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
import axios from 'axios';

export default {
    data() {
        return {};
    },
    methods: {},
    computed: {
        ...mapState(useStore, ['word', 'meanings']),
    },
    mounted() {},
};
</script>

<template>
    <div class="container mt-5 pt-5">
        <div class="dictionary m-4 p-4" v-if="meanings[0]">
            <div class="row">
                <h2>{{ meanings[0].word }} [{{ meanings[0].phonetic }}]</h2>
            </div>
            <hr class="hr" />
            <h5 class="px-2">{{ meanings[0].meanings[0].partOfSpeech }}</h5>
            <div class="row">
                <p class="px-4 mx-4" v-for="(item, index) in meanings[0].meanings[0].definitions">{{ index + 1 }}. {{ item.definition }}</p>
            </div>

            <hr class="hr" />
            <h5 class="px-2">{{ meanings[0].meanings[1].partOfSpeech }}</h5>
            <div class="row">
                <p class="px-4 mx-4" v-for="(item, index) in meanings[0].meanings[1].definitions">{{ index + 1 }}. {{ item.definition }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dictionary {
    color: black;
    background-color: white;
    border-radius: 20px;
}
</style>
