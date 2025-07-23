import { createApp } from 'vue';
import App from './App.vue';

import { createPinia } from 'pinia';
import router from './router';           // Solo si usas router

import './assets/main.css';


const app = createApp(App);

app.use(createPinia());
app.use(router);                         // Solo si usas router

app.mount('#app');
