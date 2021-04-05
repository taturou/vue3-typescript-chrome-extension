import { createApp } from 'vue'
import App from './App.vue'
import { store } from '@/lib/store'
import { router } from './router'

document.addEventListener('DOMContentLoaded', () => {
  createApp(App) // prettier-ignore
    .use(store)
    .use(router)
    .mount('#app')
})
