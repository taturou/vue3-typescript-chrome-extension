import { createApp } from 'vue'
import App from './App.vue'
import { store } from '@/lib/store'
import PrimeVue from 'primevue/config'
import PButton from 'primevue/button'
import PCard from 'primevue/card'
import PTextarea from 'primevue/textarea'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

document.addEventListener('DOMContentLoaded', () => {
  createApp(App)
    .use(store)
    .use(PrimeVue)
    .component('p-button', PButton)
    .component('p-card', PCard)
    .component('p-textarea', PTextarea)
    .mount('#app')
})
