import { createRouter, createWebHistory } from '@ionic/vue-router';

import AuthorizationPage from '../pages/AuthorizationPage';
import CoffeePage from '../pages/CoffeePage.vue';
import CartPage from '../pages/CartPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/auth',
    component: AuthorizationPage
  },
  {
    path: '/coffee',
    component: CoffeePage
  },
  {
    path: '/coffee/:id',
    component: () => import('../pages/CoffeeDetail.vue')
  },
  {
    path: '/cart',
    component: CartPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
