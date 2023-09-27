import { createRouter, createWebHistory } from '@ionic/vue-router';
import { menuController } from '@ionic/vue';

// import store from '../store/index.js';
import SplashPage from '../pages/SplashPage.vue';
import AuthorizationPage from '../pages/AuthorizationPage.vue';
import CoffeePage from '../pages/CoffeePage.vue';
import CartPage from '../pages/CartPage.vue';
import CheckoutPage from '../pages/CheckoutPage.vue';
import CheckoutResultPage from '../pages/CheckoutResultPage.vue';
import SpecialsPage from '../pages/SpecialsPage.vue';
import OrdersPage from '../pages/OrdersPage.vue';
import ReviewPage from '../pages/ReviewPage.vue';
import FeedbackPage from '../pages/FeedbackPage.vue';
import DeletePage from '../pages/DeletePage.vue';
import ShopPickPage from '../pages/ShopPickPage.vue';

import TestPage from '../pages/TestPage.vue';

const routes = [
	{
		path: '/',
		component: SplashPage,
		meta: {
			isMenuDisabled: true
		}
	},
	{
		path: '/auth',
		component: AuthorizationPage,
		meta: {
			isMenuDisabled: true
		}
	},
	{
		path: '/shop',
		component: ShopPickPage,
		meta: {
			isMenuDisabled: true
		}
	},
	{
		path: '/coffee',
		component: CoffeePage
	},
	{
		path: '/coffee/:id',
		component: () => import('../pages/CoffeeDetail.vue'),
		meta: {
			isMenuDisabled: true
		}
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
		path: '/result',
		name: 'Result',
		component: CheckoutResultPage,
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
		path: '/delete',
		component: DeletePage
	},
	{
		path: '/test',
		component: TestPage
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});
const mainMenuId = 'main';

router.beforeEach(async (to, from, next) => {
	if(to.matched.some(record => record.meta.isMenuDisabled)) {
		if(menuController.isEnabled(mainMenuId)) {
			await menuController.close(mainMenuId);
			await menuController.enable(false, mainMenuId);
		}
		next();
		/* if(store.getters.isAuthorized) {
			next({
				path: '/shop',
				query: {isAuthorized: true}
			})
		} else {
			next({
				path: '/auth'
			});
		} */
	} else {
		await menuController.enable(true, 'main');
		next();
	}
});

export default router
