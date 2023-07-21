import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView')
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: () => import( '../views/Authorization')
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('../views/Registration')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
