import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tw',
      component: Home,
      meta: { lang: 'tw' }
    },
    {
      path: '/en',
      name: 'en',
      component: Home,
      meta: { lang: 'en' }
    },
    {
      path: '/cn',
      name: 'cn',
      component: Home,
      meta: { lang: 'cn' }
    }
  ]
})

export default router
