import $ from 'jquery'
import { createApp } from 'vue'
import { store } from '@/lib/store'
import Counter from './components/Counter.vue'
import PrimeVue from 'primevue/config'
import PButton from 'primevue/button'
import PSidebar from 'primevue/sidebar'
import PProgressBar from 'primevue/progressbar'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './css/index.scss'

const idPrefix = 'vue3-typescript-chrome-extension-'

function vueMount() {
  const id = `${idPrefix}counter`

  // Create dom to mount a Vue component
  const html = `<div id="${id}"></div>`
  const body = $('body')[0]
  if (!body) {
    throw new Error('There is no "body" element.')
  }
  $(body).append(html)

  // Mount the Counter vue component
  createApp(Counter) // prettier-ignore
    .use(store)
    .use(PrimeVue)
    .component('p-button', PButton)
    .component('p-sidebar', PSidebar)
    .component('p-progress-bar', PProgressBar)
    .mount(`#${id}`)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onLoaded(this: Window, _event: Event): void {
  vueMount()
}

window.addEventListener('load', onLoaded, false)
