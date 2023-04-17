import { createRouter, createWebHistory } from 'vue-router';
import Notes from '../views/Notes.vue';
import MapGallery from '../views/MapGallery.vue';
import BuyList from '../views/BuyList.vue';
import News from '../views/News.vue';
import Weather from '../views/Weather.vue';
import BuyListID from '../views/BuyListID.vue';
import Dictionary from '../views/Dictionary.vue';
import Words from '../views/Words.vue';
import Translator from '../views/Translator.vue';
import Auth from '../views/Auth.vue';
import TodoList from '../views/TodoList.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // {
        //     path: "/",
        //     name: "home",
        //     component: ShowList,
        // },ç
        {
            path: '/auth',
            name: 'auth',
            component: Auth,
        },
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
            path: '/buyList/:id',
            name: 'buyListID',
            component: BuyListID,
        },
        {
            path: '/news',
            name: 'news',
            component: News,
        },
        {
            path: '/news/:category',
            name: 'newsCat',
            component: News,
        },
        {
            path: '/weather',
            name: 'weather',
            component: Weather,
        },
        {
            path: '/dictionary',
            name: 'dictionary',
            component: Dictionary,
        },
        {
            path: '/translator',
            name: 'translator',
            component: Translator,
        },
        {
            path: '/words',
            name: 'words',
            component: Words,
        },
        {
            path: '/todoList',
            name: 'todoList',
            component: TodoList,
        },
    ],
});

export default router;
