import { createApp } from 'vue';

import App from './App.vue';

import './style.css';

export const init = () => createApp(App).mount('#app');

export type A = 'A';
