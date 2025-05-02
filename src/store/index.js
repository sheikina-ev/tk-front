import { createStore } from 'vuex';
import operations from '@/api/operations';
import loadingCtrl from '@/api/loading';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const store = createStore({
	state: {
		sections: [],
		products: [],
		product: {},
		activeSection: 0,
		// WIP
		cart: [],
		cartTotal: 0,
		lineIdCount: 0,
		shops: [],
		tmpPhone: '',
		specials: [],
		activeShop: false,
		orders: [],
		bonus: '',
		isAuthorized: false,
		user: JSON.parse(localStorage.getItem('user')) || null,
		favorites: JSON.parse(localStorage.getItem('favorites')) || []  // Загружаем избранное из localStorage или пустой массив
	},
	getters: {
		activeSection(state) {
			return state.activeSection;
		},
		sections(state) {
			return state.sections;
		},
		products(state) {
			return state.products;
		},
		coffeeList(state) {
			return state.coffeeList;
		},
		product(state) {
			return state.product;
		},
		cart(state) {
			return state.cart;
		},
		cartCount(state) {
			let count = 0;
			state.cart.forEach(item => {
				count += item.amount;
			});

			return count > 0 ? count : false;
		},
		cartTotal(state) {
			return state.cartTotal;
		},
		specials(state) {
			return state.specials;
		},
		bonus(state) {
			return state.bonus;
		},
		// Placeholders
		isAuthorized(state) {
			return state.isAuthorized;
		},
		shops(state) {
			return state.shops;
		},
		// Пример проверки, авторизован ли пользователь
		isAuthenticated: (state) => {
			return !!state.user; // Если есть объект пользователя, значит, он авторизован

		},
		activeShop(state) {
			if(!state.activeShop || state.shops === false) return false;

			return state.shops.find(shop => {
				return shop.id === state.activeShop;
			})
		},
		shop: state => shopId => {
			return state.shops.find(shop => {
				return shop.guid === shopId;
			})
		},
		orders(state) {
			return state.orders;
		},
		tmpPhone(state) {
			return state.tmpPhone;
		},
		user(state) {
			return state.user;
		},
		isFavorite: (state) => (productId) => {
			return state.favorites.some(product => product.id === productId);  // Проверяем, есть ли товар в избранном
		},
		favorites: state => state.favorites  // Возвращаем все избранные товары
	},
	mutations: {
		updateCartProductAmount(state, { productId, amount }) {
			const product = state.cart.find(item => item.productId === productId);
			if (product) {
				product.amount = amount;
			}
			localStorage.setItem('cart', JSON.stringify(state.cart));
		},
		incrementLineIdCount(state) {
			state.lineIdCount += 1; // инкрементируем счетчик
		},
		clearState(state, propertyName) {
			switch(typeof state[propertyName]) {
				case 'string':
				case 'number':
					state[propertyName] = '';
					break;
				case 'object':
					state[propertyName] = [];
					break;
			}
		},
		addFavorite(state, product) {
			// Добавляем товар в список избранных
			state.favorites.push(product);
			localStorage.setItem('favorites', JSON.stringify(state.favorites));  // Сохраняем избранные товары в localStorage
		},
		removeFavorite(state, productId) {
			// Удаляем товар из избранных
			state.favorites = state.favorites.filter(product => product.id !== productId);
			localStorage.setItem('favorites', JSON.stringify(state.favorites));  // Сохраняем обновленный список в localStorage
		},
		clearCart(state) {
			state.cart = [];
		},
		setActiveSection(state, id) {
			state.activeSection = id;
		},
		updateSections(state, sections) {
			state.sections = sections;
		},
		updateProducts(state, products) {
			state.products = products;
		},
		setProduct(state, product) {
			state.product = product;
		},
		addToCart(state, payload) {
			// Находим товар в корзине с таким же productId и modifiers
			const existing = state.cart.find(item =>
				item.productId === payload.productId &&
				JSON.stringify(item.modifiers) === JSON.stringify(payload.modifiers)
			);

			if (existing) {
				// Если товар уже есть в корзине, увеличиваем его количество
				existing.amount += payload.amount;
			} else {
				// Если товара нет в корзине, добавляем его и увеличиваем уникальный идентификатор
				payload.line_id = ++state.lineIdCount;
				state.cart.push(payload);
			}

			// Сохраняем обновленную корзину в localStorage
			localStorage.setItem('cart', JSON.stringify(state.cart));
		},


		calculateCartTotal(state) {
			var total = 0;
			const cart = state.cart;
			cart.forEach(item => {
				total += item.price * item.amount;
			});

			state.cartTotal = total;
		},
		updateShops(state, payload) {
			state.shops = payload;
		},
		selectShop(state, payload) {
			const shopId = payload.shopId;

			state.activeShop = shopId;
			// state.cart = [];
			localStorage.setItem('activeShop', JSON.stringify(shopId));
		},
		setOrderHistory(state, payload) {
			state.orders = payload;
		},
		// Placeholders
		changeAmount(state, { _uniqueKey, action }) {
			const item = state.cart.find(item => item._uniqueKey === _uniqueKey);
			if (!item) return;

			switch (action) {
				case 'increase':
					item.amount++;
					break;
				case 'decrease':
					if (item.amount > 1) item.amount--;
					break;
			}
		},
		removeCartItem(state, payload) {
			const line_id = payload.line_id;
			state.cart = state.cart.filter(item => item.line_id !== line_id);

			if(state.cart.length === 0) state.lineIdCount = 0;  // Синхронизируем с localStorage
			localStorage.setItem('cart', JSON.stringify(state.cart));  // Обновляем данные в localStorage
		},
		dropCart(state) {
			state.cart = [];
			localStorage.removeItem('cart');  // Очищаем корзину из localStorage
		},
		authorize(state) {
			state.isAuthorized = true;
		},
		unauthorize(state) {
			state.isAuthorized = false;
		},
		writeTmpPhone(state, payload) {
			state.tmpPhone = payload.phone;
		},
		updateSpecials(state, payload) {
			state.specials = payload;
		},
		setUser(state, user) {
			state.user = user;
			localStorage.setItem('user', JSON.stringify(user));  // Сохраняем данные
		},
		updateCart(state, cart) {
			state.cart = cart;
			localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем корзину
		},

		saveUser(state, payload) {
			state.user = payload;
		},
		dropUser(state) {
			state.user = {};
		},
		setBonuses(state, payload) {
			state.bonus = payload;
		},
		// Attempting to separate an empty value and loading state
		SET_LOADING_STATE(state, propertyName) {
			state[propertyName] = false;
		}
	},
	actions: {

		async auth({ commit }) {
			const userData = await Storage.get({ key: 'userData' });
			if (userData.value === null || userData.value === 'undefined') return false;

			let params = JSON.parse(userData.value);

			try {
				const { data } = await operations.auth({ params: params });

				if (data.status === 'OK') {
					commit('saveUser', params);
					commit('authorize');
					return data;
				}
			} catch (err) {
				console.log(err);
			}

			return false;
		},

		clearCart({ commit }) {
			commit('clearCart');
		},
		async updateUserName({ commit, state }, newName) {
			try {
				const response = await operations.post("/customer/updateName", {
					name: newName,
					api_token: state.user.api_token
				});

				if (response.status === 200) {
					const updatedUser = {...state.user, name: newName};
					commit("setUser", updatedUser);
				}
			} catch (error) {
				console.error("Ошибка обновления имени:", error);
			}
		},
		async login({ commit }, params) {
			const loading = await loadingCtrl.loading();
			try {
				const { data } = await operations.login(params);

				loading.dismiss();

				if(data.status !== 'error') {
					const userData = {
						name: params.params.name,
						phone: params.params.phone,
						api_token: data.token
					};

					localStorage.setItem('user', JSON.stringify(userData))

					commit('saveUser', userData);
					await Storage.set({
						'key': 'userData',
						'value': JSON.stringify(userData)
					});
					commit('authorize');

					return data;
				}
			} catch(err) {
				console.log(err);
				loading.dismiss();
			}

			return false;
		},
		// eslint-disable-next-line no-unused-vars
		async requestConfirmationCode({ commit }, params) {
			const loading = await loadingCtrl.loading();
			try {
				const { data } = await operations.requestConfirmationCode(params);
				loading.dismiss();
				return data;
			} catch(err) {
				console.log(err);
				loading.dismiss();
			}

			return false;
		},
		// eslint-disable-next-line no-unused-vars
		async sendConfirmationCode({ commit }, params) {
			const loading = await loadingCtrl.loading();
			try {
				const { data } = await operations.sendConfirmationCode(params);
				loading.dismiss();
				return data;
			} catch(err) {
				console.log(err);
				loading.dismiss();
			}

			return false;
		},
		async getCategories({ commit }) {
			const loading = await loadingCtrl.loading();
			try {
				const { data } = await operations.getCategories();

				commit('updateSections', data.categories);
				if(this.getters.activeSection <= 0) {
					commit('setActiveSection', data.defaultCategory.id);
				}

				loading.dismiss();
				return true;
			} catch(err) {
				console.log(err);
				loading.dismiss();
			}

			return false;
		},
		async getProducts({ commit }, params) {
			// const loading = await loadingCtrl.loading();
			try {
				commit('SET_LOADING_STATE', 'products');
				const { data } = await operations.getProducts(params);
				// loading.dismiss();

				commit('updateProducts', data.products);
				return true;
			} catch(err) {
				console.log(err);
				// loading.dismiss();
			}
			return false;
		},
		async getProduct({ commit }, params) {
			// const loading = await loadingCtrl.loading();
			commit('SET_LOADING_STATE', 'product');

			try {
				const { data } = await operations.getProduct(params);
				// loading.dismiss();

				commit('setProduct', data.product);

				return data
			} catch(err) {
				console.log(err);
				// loading.dismiss();
			}

			return false;
		},
		async getStores({ commit }, params = {}) {
			// const loading = await loadingCtrl.loading();

			try {
				commit('SET_LOADING_STATE', 'shops');
				const { data } = await operations.getStores();

				commit('updateShops', data.stores);
				// loading.dismiss();

				if(params.setActiveShop) commit('selectShop', {shopId: data.stores[0].id});
				return true;
			} catch(err) {
				console.log(err);
				// loading.dismiss();
			}

			return false;
		},
		async getOrderHistory({ commit }, phone) {
			// const loading = await loadingCtrl.loading();

			try {
				commit('SET_LOADING_STATE', 'orders');
				const { data } = await operations.getOrderHistory(phone);

				commit('setOrderHistory', data.orders_list);
				// loading.dismiss();

				return true;
			} catch(err) {
				console.log(err);
				// loading.dismiss();
			}

			return false;

		},

		async getBonuses({ commit }, phone) {
			const loading = await loadingCtrl.loading();
			const { data } = await operations.getBonuses({params: {phone: phone}});

			if(data.walletBalances !== undefined) {
				commit('setBonuses', data.walletBalances[0].balance);
			} else {
				commit('setBonuses', 0);
			}

			loading.dismiss();
		},
		async getSpecials({ commit }) {
			// const loading = await loadingCtrl.loading();

			try {
				commit('SET_LOADING_STATE', 'specials');
				const { data } = await operations.getSpecials();

				commit('updateSpecials', data.special_list);
				// loading.dismiss();

				return true;
			} catch(err) {
				console.log(err);
				// loading.dismiss();
			}

			return false;
		},
		addToCart({ commit, state }, product) {
			const existingItem = state.cart.find(item => item._uniqueKey === product._uniqueKey);

			if (existingItem) {
				existingItem.amount += product.amount || 1;
			} else {
				commit('addToCart', product);
			}

			commit('calculateCartTotal');
		},
		async logout({ commit }) {
			commit('setUser', null); // Очистка данных пользователя
			localStorage.removeItem('user'); // Удаление пользователя из localStorage
		},
		async sendOrder({ commit }, params) {
			const loading = await loadingCtrl.loading();
			try {
				const { data } = await operations.sendOrder(params);

				loading.dismiss();

				if(data.status !== 'error') {
					commit('dropCart');
					return data;
				}
			} catch(err) {
				console.log(err);

				loading.dismiss();
			}


			return false;
		},
		// eslint-disable-next-line no-unused-vars
		async checkOrder({ commit }, params) {
			const loading = await loadingCtrl.loading();
			const { data } = await operations.checkOrder(params);

			loading.dismiss();

			if(data.status !== 'error') {

				return data;
			}

			return false;
		},
		loadUserFromStorage({ commit }) {
			const user = localStorage.getItem('user');
			if (user) {
				commit('setUser', JSON.parse(user));
			}
		},
		// eslint-disable-next-line no-unused-vars
		async getInfoPage({ commit }, params) {
			const loading = await loadingCtrl.loading();
			try {
				const { data } = await operations.getInfoPage(params);

				loading.dismiss();

				if(data.status !== 'error') {
					return data;
				}
			} catch(err) {
				console.log(err);

				loading.dismiss();
			}

			return false;
		},
		// eslint-disable-next-line no-unused-vars
		async sendReview({ commit }, params) {
			const loading = await loadingCtrl.loading();
			try {
				const { data } = await operations.sendReview(params);

				loading.dismiss();

				if(data.status !== 'error') {
					return data;
				}
			} catch(err) {
				console.log(err);

				loading.dismiss();
			}

			return false;
		},
		// eslint-disable-next-line no-unused-vars
		async sendFeedback({ commit }, params) {
			const loading = await loadingCtrl.loading();
			try {
				const { data } = await operations.sendFeedback(params);

				loading.dismiss();

				if(data.status !== 'error') {
					return data;
				}
			} catch(err) {
				console.log(err);

				loading.dismiss();
			}

			return false;
		},
		loadStateFromStorage({ commit }) {
			// Загружаем данные из localStorage асинхронно
			const cart = JSON.parse(localStorage.getItem('cart')) || [];
			const user = JSON.parse(localStorage.getItem('user')) || { phone: '', name: '' };
			const activeShop = JSON.parse(localStorage.getItem('activeShop')) || false;

			// Коммитим данные в store
			commit('updateCart', cart);
			commit('setUser', user);
			commit('selectShop', { shopId: activeShop });
		},
		async fetchUser({ commit }) {
			try {
				const response = await fetch('https://tk.uat.sibcode.team/api/user');
				const user = await response.json();
				commit('setUser', user);
			} catch (error) {
				console.error("Ошибка загрузки пользователя:", error);
			}
		}
	}
});

export default store;
