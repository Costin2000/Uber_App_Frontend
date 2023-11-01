import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import TheNavbar from './components/TheNavbar.vue'
import Notification from './components/ErrorNotification.vue'

const app = createApp(App);
app.component('the-navbar', TheNavbar);
app.component('notification', Notification);
app.use(router)
app.mount('#app')
