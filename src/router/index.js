import { createRouter, createWebHistory } from '@ionic/vue-router';

// import store from '../store/index.js';
import AuthorizationPage from '../pages/AuthorizationPage';
import CoffeePage from '../pages/CoffeePage.vue';
import CartPage from '../pages/CartPage.vue';
import CheckoutPage from '../pages/CheckoutPage.vue';
import SpecialsPage from '../pages/SpecialsPage.vue';
import OrdersPage from '../pages/OrdersPage.vue';
import ReviewPage from '../pages/ReviewPage.vue';
import FeedbackPage from '../pages/FeedbackPage.vue';
import ShopPickPage from '../pages/ShopPickPage.vue';

import TestPage from '../pages/TestPage.vue';

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
		path: '/shop',
		component: ShopPickPage
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
	},
	{
		path: '/checkout',
		component: CheckoutPage
	},
	{
		path: '/specials',
		component: SpecialsPage
	},
	{
		path: '/orders',
		component: OrdersPage
	},
	{
		path: '/review',
		component: ReviewPage
	},
	{
		path: '/feedback',
		component: FeedbackPage
	},
	{
		path: '/test',
		component: TestPage
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

/* router.beforeEach((to, from, next) => {
	if(to.matched.some(record => record.meta.requiresAuth)) {
		if(!store.getters.isAuthorized) {
			next({
				path: '/auth',
				query: {redirect: to.fullPath}
			})
		} else {
			next();
		}
	} else {
		next();
	}
}); */

export default router
