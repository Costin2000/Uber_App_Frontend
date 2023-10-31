import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import TheNavbar from './components/TheNavbar.vue'

const app = createApp(App);
app.component('the-navbar', TheNavbar);
app.use(router)
app.mount('#app')
