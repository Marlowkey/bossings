import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from './router';
import './index.css';


const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
// Mount the app with the router
app.use(router);

// Mount the app to the DOM
app.mount('#app');
