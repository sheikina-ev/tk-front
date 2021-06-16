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
		// Placeholders
		tmpPhone: '',
		specials: [
			{
				id: 1,
				title: 'Каша в подарок',
				subtitle: 'К любому напитку до 10:00',
				description: 'В период с 05.12.2020 по 12.01.2021 действующие участники  домашней линии – физическое лицо, получившие предложение об участии в акции на свой электронный адрес, при условии соблюдения всех условий акции, а также новые участники.',
				backgroundPicture: '',
			},
			{
				id: 2,
				title: '50% на холодную витрину',
				subtitle: 'С 20:00 до закрытия',
				description: 'В период с 05.12.2020 по 12.01.2021 действующие участники  домашней линии – физическое лицо, получившие предложение об участии в акции на свой электронный адрес, при условии соблюдения всех условий акции, а также новые участники.',
				backgroundPicture: '',
			}
			,{
				id: 3,
				title: 'Вкусный подарок детям',
				subtitle: 'С 7:30 до 23:00',
				description: 'В период с 05.12.2020 по 12.01.2021 действующие участники  домашней линии – физическое лицо, получившие предложение об участии в акции на свой электронный адрес, при условии соблюдения всех условий акции, а также новые участники.',
				backgroundPicture: '',
			}
			,{
				id: 4,
				title: 'Осеннее предложение',
				subtitle: 'То, что нужно чтобы согрется :)',
				description: 'В период с 05.12.2020 по 12.01.2021 действующие участники  домашней линии – физическое лицо, получившие предложение об участии в акции на свой электронный адрес, при условии соблюдения всех условий акции, а также новые участники.',
				backgroundPicture: '',
			}
		],
		activeShop: false,
		orders: [],
		bonus: '',
		isAuthorized: false,
		user: {}
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
		activeShop(state) {
			if(!state.activeShop) return false;
			
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
		}
	},
	mutations: {
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
			state.cart.push(payload);
			state.lineIdCount = payload.line_id;
			/* const item_id = payload.item_id;
			const line_id = state.lineIdCount + 1;
			const product = state.product;
			const item = {
				line_id: line_id,
				item_id: item_id,
				product_name: product.product_name,
				weight: Math.round(product.weight * 1000),
				weight_unit: 'мл',
				amount: 1,
				price: product.price
			};

			state.cart.push(item);
			state.lineIdCount = line_id; */
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
		},
		setOrderHistory(state, payload) {
			state.orders = payload;
		},
		// Placeholders
		changeAmount(state, payload) {
			const line_id = payload.line_id;
			const action = payload.action;
			const item = state.cart.find(item => item.line_id === line_id);
			
			switch (action) {
				case 'increase':
					item.amount++;
					break;
				case 'decrease':
					if(item.amount > 1) item.amount--;
					break;
				default:
					// duh
					break;
			}
		},
		removeCartItem(state, payload) {
			const line_id = payload.line_id;
			state.cart = state.cart.filter(item => item.line_id !== line_id);

			if(state.cart.length === 0) state.lineIdCount = 0;
		},
		dropCart(state) {
			state.cart = [];
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
			const userData = await Storage.get({key: 'userData'});
			if(userData.value === null || userData.value === "undefined") return false;
			
			let params = JSON.parse(userData.value);

			try {
				const { data } = await operations.auth({params: params});

				if(data.status === 'OK') {
					commit('saveUser', params);
					commit('authorize');

					return data;
				}
			} catch(err) {
				console.log(err);
			}

			return false;
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

				return true
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
		// eslint-disable-next-line no-unused-vars
		addToCart({ commit }, params) {
			const product = this.getters.product;
			const cart = this.getters.cart;
			const line_id = this.state.lineIdCount + 1;
			let fields = {};

			fields.line_id = line_id;
			fields.type = 'Product'; // Tmp
			fields.productId = product.guid;
			fields.name = product.product_name;
			fields.price = parseFloat(params.price);
			fields.amount = 1;
			fields.image = product.image;

			if(params.options !== undefined && params.options.length > 0) {
				fields.modifiers = [];
				params.options.forEach(optionId => {
					const group = product.options.find(options => {
						return options.values.some(value => {
							return value.id == optionId;
						})
					});
					const option = group.values.find(value => {
						return value.id == optionId;
					});
					const modifier = {
						productId: option.guid,
						name: option.name,
						amount: 1,
						productGroupId: group.guid,
						// groupName: group.name
					};
					
					fields.modifiers.push(modifier);

					if(option.price > 0) fields.price += parseFloat(option.price);
				});
			}

			const item = cart.find(line => {
				return line.id === fields.id && JSON.stringify(line.modifiers) === JSON.stringify(fields.modifiers);
			});
			if(typeof item !== 'undefined') {
				commit('changeAmount', {
					line_id: item.line_id,
					action: 'increase'
				});
			} else {
				commit('addToCart', fields);
			}

			commit('calculateCartTotal');
		},
		async logout({ commit }) {
			commit('unauthorize');
			commit('dropUser');
			await Storage.remove({key: 'userData'});
			commit('clearState', 'bonus');
		},
		async sendOrder({ commit }, params) {
			const loading = await loadingCtrl.loading();
			const { data } = await operations.sendOrder(params);

			loading.dismiss();

			if(data.status !== 'error') {
				commit('dropCart');
				return data;
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
		}
	}
});

export default store;
