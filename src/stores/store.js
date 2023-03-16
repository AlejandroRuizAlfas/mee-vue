import axios from 'axios';
import { defineStore } from 'pinia';

const url = 'http://localhost:3000';

export const useStore = defineStore('store', {
	state() {
		return {
			isOpen: false,
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
	},
});
