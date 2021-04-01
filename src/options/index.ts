import { createApp } from 'vue'
import App from './App.vue'
import { store } from '@/lib/store'
import { router } from './router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

document.addEventListener('DOMContentLoaded', () => {
  createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
})
