import { createApp } from 'vue';
import './assets/style/index.scss';
import createWebRouter from './router';
import App from './App.vue';

export const app = createApp(App);
app.use(createWebRouter());
app.mount('#app');
