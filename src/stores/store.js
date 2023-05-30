import axios from 'axios';
import { defineStore } from 'pinia';
import { notify } from '@kyvg/vue3-notification';
const url = 'https://meedb.000webhostapp.com/api';

export const useStore = defineStore('store', {
    state() {
        return {
            user: JSON.parse(localStorage.getItem('mee_user')) || { user_id: '', username: '', email: '' },
            isOpen: false,
            word: '',
            meanings: [],
            isAxiosLoading: false,
        };
    },

    actions: {
        toggleMenu() {
            this.isOpen = !this.isOpen;
        },
        async setWord(userWord) {
            this.word = userWord;
            let response = await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + this.word);
            this.meanings = response.data;
        },
        async registerUser(user) {
            try {
                this.isAxiosLoading = true;
                let response = await axios.post(url + '/auth/register', JSON.stringify(user));
                notify({ type: 'success', text: 'You are now registered! Use your credentials to login!' });
                return response.data;
            } catch (err) {
                notify({ type: 'error', text: 'Email is already registered!' });
            } finally {
                this.isAxiosLoading = false;
            }
        },
        async loginUser(user) {
            this.isAxiosLoading = true;
            let response = await axios.post(url + '/auth/login', JSON.stringify(user));
            this.isAxiosLoading = false;
            return response.data;
        },
        async addNoteStore() {
            let date = new Date().toISOString().replace('T', ' ').slice(0, -5);
            let newNote = { title: 'Empty note', content: '', date: date, color: '#fff', owner: this.user.user_id };
            let response = await axios.post(url + '/notes/add', JSON.stringify(newNote));
            response ? notify({ type: 'success', text: 'New note created!' }) : '';
            return response.data;
        },
        async editNoteStore(note) {
            let response = await axios.post(url + '/notes/edit', JSON.stringify(note));
            response ? notify({ type: 'success', text: 'Note updated!' }) : '';
            return response.data;
        },
        async deleteNoteStore(note) {
            let response = await axios.delete(url + '/notes/delete', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                params: {
                    id: note.note_id,
                },
            });
            response ? notify({ type: 'error', text: 'Note deleted!' }) : '';
            return response.data;
        },
        async addBuylistStore() {
            let prods = `{"products": []}`;
            let list = { name: 'New list', elements: prods, count: 0, owner: this.user.user_id };
            let response = await axios.post(url + '/buylist/add', JSON.stringify(list));
            response ? notify({ type: 'success', text: 'New buylist created!' }) : '';
            return response.data;
        },
        async editBuylistStore(list) {
            let response = await axios.post(url + '/buylist/edit', JSON.stringify(list));
            response ? notify({ type: 'success', text: 'Buylist updated!' }) : '';
            return response.data;
        },
        async deleteBuylisStore(list) {
            let response = await axios.delete(url + '/buylist/delete?id=' + list.buylist_id);
            response ? notify({ type: 'error', text: 'Map location deleted!' }) : '';
            return response.data;
        },
        async addMapStore(loc) {
            loc.owner = this.user.user_id;
            let response = await axios.post(url + '/maps/add', JSON.stringify(loc));
            response ? notify({ type: 'success', text: 'New map location added!' }) : '';
            return response.data;
        },
        async editMapStore(map) {
            let response = await axios.post(url + '/maps/edit', JSON.stringify(map));
            response ? notify({ type: 'success', text: 'Map location updated!' }) : '';
            return response.data;
        },
        async deleteMapStore(map) {
            let response = await axios.delete(url + '/maps/delete?id=' + map.map_id);
            response ? notify({ type: 'error', text: 'Map location deleted!' }) : '';
            return response.data;
        },
        async addTodoStore(todo) {
            todo.owner = this.user.user_id;
            let response = await axios.post(url + '/todos/add', JSON.stringify(todo));
            response ? notify({ type: 'success', text: 'New todo added!' }) : '';
            return response.data;
        },
        async editTodoStore(todo) {
            let response = await axios.post(url + '/todos/edit', JSON.stringify(todo));
            response ? notify({ type: 'success', text: 'Todo updated!' }) : '';
            return response.data;
        },
        async deleteTodoStore(todo) {
            let response = await axios.delete(url + '/todos/delete?id=' + todo.todo_id);
            response ? notify({ type: 'error', text: 'Todo deleted!' }) : '';
            return response.data;
        },
        stopAxiosLoading() {
            this.isAxiosLoading = false;
        },
    },
    getters: {
        getAllNotes: (state) => async () => {
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
