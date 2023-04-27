import axios from 'axios';
import { defineStore } from 'pinia';

const url = 'https://meedb.000webhostapp.com/api';
// const url = import.meta.env.VITE_URL;

export const useStore = defineStore('store', {
    state() {
        return {
            user: { user_id: 1, username: 'aruizalfas', email: 'aruizalfas@gmail.com' },
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
        },
        async registerUser(user) {
            let response = await axios.post(url + '/auth/register', JSON.stringify(user));
            return response.data;
        },
        async loginUser(user) {
            let response = await axios.post(url + '/auth/login', JSON.stringify(user));
            return response.data;
        },
        async addNoteStore() {
            let date = new Date().toISOString().replace('T', ' ').slice(0, -5);
            let newNote = { title: 'Empty note', content: '', date: date, color: '#fff', owner: this.user.user_id };
            let response = await axios.post(url + '/notes/add', JSON.stringify(newNote));
            return response.data;
        },
        async editNoteStore(note) {
            let response = await axios.post(url + '/notes/edit', JSON.stringify(note));
            return response.data;
        },
        async deleteNoteStore(note) {
            let response = await axios.delete(url + '/notes/delete', {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    id: note.note_id,
                },
            });
            return response.data;
        },

        async addBuylistStore(list) {
            let response = await axios.post(url + '/buylist/add', JSON.stringify(list));
            return response.data;
        },
        async editBuylistStore(list) {
            let response = await axios.post(url + '/buylist/edit', JSON.stringify(list));
            return response.data;
        },
    },
    getters: {
        getAllNotes: (state) => async () => {
            console.log('Store user: ' + state.user);
            let response = await axios.get(url + '/notes/get?user_id=' + state.user.user_id);
            return response.data;
        },
        getAllMaps: (state) => async () => {
            let response = await axios.get(url + '/maps/get?user_id=' + state.user.user_id);
            return response.data;
        },
        getAllTodos: (state) => async () => {
            let response = await axios.get(url + '/todos/get?user_id=' + state.user.user_id);
            return response.data;
        },
        getAllBuylist: (state) => async () => {
            let response = await axios.get(url + '/buylist/get?user_id=' + state.user.user_id);
            return response.data;
        },
        getBuylistID: (state) => async (id) => {
            let response = await axios.get(url + '/buylist/get?user_id=' + state.user.user_id + '&buylist_id=' + id);
            return response.data;
        },
    },
});
