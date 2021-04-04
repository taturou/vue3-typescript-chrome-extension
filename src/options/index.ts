import { createApp } from 'vue'
import App from './App.vue'
import { store } from '@/lib/store'
import { router } from './router'
import PrimeVue from 'primevue/config'
import PButton from 'primevue/button'
import PCard from 'primevue/card'
import PTextarea from 'primevue/textarea'
import PTabView from 'primevue/tabview'
import PTabPanel from 'primevue/tabpanel'
import PProgressBar from 'primevue/progressbar'
import PDataTable from 'primevue/datatable'
import PColumn from 'primevue/column'
import PConfirmPopup from 'primevue/confirmpopup'
import ConfirmationService from 'primevue/confirmationservice'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

document.addEventListener('DOMContentLoaded', () => {
  createApp(App)
    .use(store)
    .use(router)
    .use(PrimeVue)
    .component('p-button', PButton)
    .component('p-card', PCard)
    .component('p-textarea', PTextarea)
    .component('p-tab-view', PTabView)
    .component('p-tab-panel', PTabPanel)
    .component('p-progress-bar', PProgressBar)
    .component('p-data-table', PDataTable)
    .component('p-column', PColumn)
    .component('p-confirm-popup', PConfirmPopup)
    .use(ConfirmationService)
    .mount('#app')
})
