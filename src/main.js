import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import AOS from 'aos'
import 'aos/dist/aos.css' // You can also use <link> for styles
import axios from 'axios';
import { store } from './store/index.js';
window.store = store;

const app = createApp(App)
app.use(router)
app.config.globalProperties.$store = store;
app.mount('#app')

AOS.init({
  // Configuration par défaut (optionnel)
  duration: 800, // Durée de l'animation en ms
  once: true,    // Animer une seule fois
});

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
