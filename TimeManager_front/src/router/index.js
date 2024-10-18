import { createRouter, createWebHistory } from 'vue-router'
import Authentification from '@/View/Authentification.vue'
import App from '@/App.vue'
import DashboardView from '@/View/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: DashboardView
    },
    {
      path: '/auth',
      name: 'Authentification',
      component: Authentification
    }
  ]
})

export default router
