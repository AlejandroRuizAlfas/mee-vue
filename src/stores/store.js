import axios from 'axios';
import { defineStore } from 'pinia';

const url = 'http://localhost:3000';

export const useStore = defineStore('store', {
    state() {
        return {
            isOpen: false,
            word: '',
            meanings: [],
        };
    },

    actions: {
        // loadData() {
        //     axios
        //         .get(url + "/todos")
        //         .then((response) => (this.todos = response.data))
        //         .catch((err) => this.messages.push(err));
        // },
        toggleMenu() {
            this.isOpen = !this.isOpen;
        },
        async setWord(userWord) {
            this.word = userWord;
            let response = await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + this.word);
            this.meanings = response.data;
            console.log(this.meanings);
        },
    },
});
