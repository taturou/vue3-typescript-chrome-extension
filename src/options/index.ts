import { createApp } from 'vue'
import App from './App.vue'
import { store } from '@/lib/store'

document.addEventListener('DOMContentLoaded', () => {
  createApp(App)
    .use(store)
    .mount('#app')
})
