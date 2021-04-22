import { createRouter, createWebHistory } from '@ionic/vue-router';

import store from '../store/index.js';
import AuthorizationPage from '../pages/AuthorizationPage';
import CoffeePage from '../pages/CoffeePage.vue';
import CartPage from '../pages/CartPage.vue';

const routes = [
	{
		path: '/',
		redirect: '/coffee'
	},
	{
		path: '/auth',
		component: AuthorizationPage
	},
	{
		path: '/coffee',
		component: CoffeePage,
		meta: {requiresAuth: true}
	},
	{
		path: '/coffee/:id',
		component: () => import('../pages/CoffeeDetail.vue'),
		meta: {requiresAuth: true}
	},
	{
		path: '/cart',
		component: CartPage,
		meta: {requiresAuth: true}
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to, from, next) => {
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
});

export default router
