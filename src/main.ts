import { createApp } from 'vue'
import "@/scss/style.scss"
import '@/scss/popup.scss'
import App from './App.vue'
import router from '@/router/router'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
