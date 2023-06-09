import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import Notifications from '@kyvg/vue3-notification';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap';

import './global.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Notifications);

app.mount('#app');
