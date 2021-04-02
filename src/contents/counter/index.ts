import $ from 'jquery'
import { createApp } from 'vue'
import { store } from '@/lib/store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import Counter from './components/Counter.vue'
import './css/index.scss'

const idPrefix = 'vue3-typescript-chrome-extension-'

function vueMount () {
  const id = `${idPrefix}counter`

  // Create dom to mount a Vue component
  let html = `<div id="${id}"></div>`
  const body = $('body')[0]
  $(body).append(html)

  // Mount the Counter vue component
  createApp(Counter)
    .use(store)
    .use(ElementPlus)
    .mount(`#${id}`)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onLoaded (this: Window, event: Event): void {
  vueMount()
}

window.addEventListener('load', onLoaded, false)
