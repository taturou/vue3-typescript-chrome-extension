import { createRouter, createWebHistory } from 'vue-router'
import Counter from './Pages/Counter.vue'
import Memos from './Pages/Memos.vue'
import Memo from './Pages/Memo.vue'

export const router = createRouter({
  history: createWebHistory('/options/'),
  routes: [
    {
      path: '/index.html',
      name: 'Home',
      redirect: { name: 'Counter' }
    },
    {
      path: '/counter',
      name: 'Counter',
      component: Counter
    },
    {
      path: '/memos',
      name: 'Memos',
      component: Memos
    },
    {
      path: '/memo/:id',
      name: 'Memo',
      component: Memo
    }
  ]
})
