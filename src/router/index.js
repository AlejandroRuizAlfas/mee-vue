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
import Home from '../views/Home.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/auth',
            name: 'auth',
            component: Auth,
        },
        {
            path: '/notes',
            name: 'notes',
            component: Notes,
            beforeEnter: requireAuth,
        },
        {
            path: '/maps',
            name: 'maps',
            component: MapGallery,
            beforeEnter: requireAuth,
        },
        {
            path: '/buyList',
            name: 'buyList',
            component: BuyList,
            beforeEnter: requireAuth,
        },
        {
            path: '/buyList/:id',
            name: 'buyListID',
            component: BuyListID,
            beforeEnter: requireAuth,
        },
        {
            path: '/news',
            name: 'news',
            component: News,
            beforeEnter: requireAuth,
        },
        {
            path: '/news/:category',
            name: 'newsCat',
            component: News,
            beforeEnter: requireAuth,
        },
        {
            path: '/weather',
            name: 'weather',
            component: Weather,
            beforeEnter: requireAuth,
        },
        {
            path: '/dictionary',
            name: 'dictionary',
            component: Dictionary,
            beforeEnter: requireAuth,
        },
        {
            path: '/translator',
            name: 'translator',
            component: Translator,
            beforeEnter: requireAuth,
        },
        {
            path: '/words',
            name: 'words',
            component: Words,
            beforeEnter: requireAuth,
        },
        {
            path: '/todoList',
            name: 'todoList',
            component: TodoList,
            beforeEnter: requireAuth,
        },
    ],
});
function requireAuth(to, from, next) {
    if (!isLoggedIn()) {
        next({
            path: '/auth',
            query: { redirect: to.fullPath },
        });
    } else {
        next();
    }
}

function isLoggedIn() {
    if (localStorage.mee_user) {
        return true;
    } else {
        return false;
    }
}

export default router;
