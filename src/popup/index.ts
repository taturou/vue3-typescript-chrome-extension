import { createApp } from 'vue'
import App from './App.vue'
import { store } from '@/lib/store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

document.addEventListener('DOMContentLoaded', () => {
  createApp(App) // prettier-ignore
    .use(store)
    .use(ElementPlus)
    .mount('#app')
})
