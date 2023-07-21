import { createApp } from 'vue'
import App from './App'
import router from './router'
import { createPinia } from 'pinia'
import  './style/style.scss'
const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')


