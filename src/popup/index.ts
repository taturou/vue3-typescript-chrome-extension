import { createApp } from 'vue'
import App from './App.vue'
import { store } from '@/lib/store'

document.addEventListener('DOMContentLoaded', () => {
  createApp(App) // prettier-ignore
    .use(store)
    .mount('#app')
})
