import { createRouter, createWebHistory } from 'vue-router';
import Notes from '../views/Notes.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		// {
		//     path: "/",
		//     name: "home",
		//     component: ShowList,
		// },
		{
			path: '/notes',
			name: 'notes',
			component: Notes,
		},
	],
});

export default router;
