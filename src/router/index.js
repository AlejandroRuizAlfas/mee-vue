import { createRouter, createWebHistory } from 'vue-router';
import Notes from '../views/Notes.vue';
import MapGallery from '../views/MapGallery.vue';
import BuyList from '../views/BuyList.vue';
import News from '../views/News.vue';

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
		{
			path: '/maps',
			name: 'maps',
			component: MapGallery,
		},
		{
			path: '/buyList',
			name: 'buyList',
			component: BuyList,
		},
		{
			path: '/news',
			name: 'news',
			component: News,
		},
	],
});

export default router;
