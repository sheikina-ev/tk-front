import { createRouter, createWebHistory } from '@ionic/vue-router';
import { menuController } from '@ionic/vue';

import CoffeePage from '../pages/CoffeePage.vue';
import CartPage from '../pages/CartPage.vue';
import CheckoutPage from '../pages/CheckoutPage.vue';
import CheckoutResultPage from '../pages/CheckoutResultPage.vue';
import SpecialsPage from '../pages/SpecialsPage.vue';
import OrdersPage from '../pages/OrdersPage.vue';
import ReviewPage from '../pages/ReviewPage.vue';
import FeedbackPage from '../pages/FeedbackPage.vue';
import ShopPickPage from '../pages/ShopPickPage.vue';
import TestPage from '../pages/TestPage.vue';

// Добавляем импорт компонента модального окна
import NotFoundPage from "@/pages/NotFoundPage.vue";
import CoffeeDetail from "@/pages/CoffeeDetail.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import AuthorizationPage from "@/pages/AuthorizationPage.vue";
import FavoritesPage from "@/pages/FavoritesPage.vue";

const routes = [
	{
		path: '/shop',
		component: ShopPickPage,
		meta: {
			isMenuDisabled: true
		}
	},
	{
		path: '/',
		component: CoffeePage
	},

	{
		path: '/coffee/:id',
		component: CoffeeDetail,
		meta: {
			isModal: true
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
		path: '/order-success',
		name: 'OrderSuccess',
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
		path: '/test',
		component: TestPage
	},
	{
		path: '/auth',
		component: AuthorizationPage
	},

	{
		path: '/profile',
		component: ProfilePage
	},
	{
		path: '/favorites',
		name: 'Favorites',
		component: FavoritesPage
	},
	/*
	{
		path: '/coffee/:id',
		component: Modal,
		meta: {
			isModal: true
		}
	},
	*/
	{
		path: '/:catchAll(.*)',
		component: NotFoundPage // Перенаправление на страницу 404 для всех несуществующих маршрутов
	}

];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

const mainMenuId = 'main';

router.beforeEach(async (to, from, next) => {
	if (to.matched.some(record => record.meta.isMenuDisabled)) {
		if (menuController.isEnabled(mainMenuId)) {
			await menuController.close(mainMenuId);
			await menuController.enable(false, mainMenuId);
		}
		next();
	} else {
		await menuController.enable(true, 'main');
		next();
	}
});

export default router;
