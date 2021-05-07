import { createStore } from 'vuex';
import operations from '@/api/operations';
import loadingCtrl from '@/api/loading';
/* import { Plugins } from '@capacitor/core';
const { Storage } = Plugins; */

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
		orders: [
			{
				id: '4536437',
				date: '09:12 17.12.2020',
				items: [
					{
						lineId: 1,
						id: 1,
						name: 'Капучино',
						weight: 500,
						options: [
							{
								id: 1,
								name: 'Без сливок',
							},
							{
								id: 2,
								name: 'Корица',
							},
							{
								id: 3,
								name: 'Кокосовое молоко',
							},
							{
								id: 4,
								name: 'Сахар',
							},
							{
								id: 5,
								name: 'Гренадин сироп'
							}
						],
						price: 100
					},
					{
						lineId: 2,
						id: 2,
						name: 'Латте',
						weight: 380,
						options: [
							{
								id: 1,
								name: 'Без сливок',
							},
							{
								id: 2,
								name: 'Корица',
							},
							{
								id: 3,
								name: 'Кокосовое молоко',
							},
							{
								id: 4,
								name: 'Сахар',
							},
							{
								id: 5,
								name: 'Гренадин сироп'
							}
						],
						price: 50
					}
				],
				total: 880,
				address: 'Усова 96',
				status: 'ongoing'
			},
			{
				id: '4536436',
				date: '09:12 16.12.2020',
				items: [
					{
						lineId: 1,
						id: 1,
						name: 'Капучино',
						weight: 500,
						options: [
							{
								id: 1,
								name: 'Без сливок',
							},
							{
								id: 2,
								name: 'Корица',
							},
							{
								id: 3,
								name: 'Кокосовое молоко',
							},
							{
								id: 4,
								name: 'Сахар',
							},
							{
								id: 5,
								name: 'Гренадин сироп'
							}
						],
						price: 100
					},
					{
						lineId: 2,
						id: 2,
						name: 'Латте',
						weight: 380,
						options: [
							{
								id: 1,
								name: 'Без сливок',
							},
							{
								id: 2,
								name: 'Корица',
							},
							{
								id: 3,
								name: 'Кокосовое молоко',
							},
							{
								id: 4,
								name: 'Сахар',
							},
							{
								id: 5,
								name: 'Гренадин сироп'
							}
						],
						price: 50
					}
				],
				total: 880,
				address: 'Усова 96',
				status: 'delivered'
			}
		],
		isAuthorized: false
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
		cartTotal(state) {
			return state.cartTotal;
		},
		specials(state) {
			return state.specials;
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
		orders(state) {
			return state.orders;
		},
		tmpPhone(state) {
			return state.tmpPhone;
		}
	},
	mutations: {
		clearState(state, propertyName) {
			state[propertyName] = [];
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
		}
	},
	actions: {
		// eslint-disable-next-line no-unused-vars
		async login({ commit }, params) {
			const loading = await loadingCtrl.loading();
			const { data } = await operations.login(params);
			
			loading.dismiss();

			if(data.status !== 'error') {
				return data;
			}

			return false;
		},
		// eslint-disable-next-line no-unused-vars
		async requestConfirmationCode({ commit }, params) {
			const loading = await loadingCtrl.loading();
			const { data } = await operations.requestConfirmationCode(params);

			loading.dismiss();

			if(data.status !== 'error') {
				return data;
			}

			return false;
		},
		// eslint-disable-next-line no-unused-vars
		async sendConfirmationCode({ commit }, params) {
			const loading = await loadingCtrl.loading();
			const { data } = await operations.sendConfirmationCode(params);

			loading.dismiss();

			if(data.status !== 'error') {
				return data;
			}

			return false;
		},
		async getCategories({ commit }) {
			const loading = await loadingCtrl.loading();
			const { data } = await operations.getCategories();

			commit('updateSections', data.categories);
			commit('setActiveSection', data.defaultCategory.id);
			loading.dismiss();
		},
		async getProducts({ commit }, params) {
			const loading = await loadingCtrl.loading();
			const { data } = await operations.getProducts(params);

			commit('updateProducts', data.products);
			loading.dismiss();
		},
		async getProduct({ commit }, params) {
			const loading = await loadingCtrl.loading();
			const { data } = await operations.getProduct(params);

			commit('setProduct', data.product);
			loading.dismiss();
		},
		async getStores({ commit }) {
			const loading = await loadingCtrl.loading();
			const { data } = await operations.getStores();

			commit('updateShops', data.stores);
			loading.dismiss();
		},
		// eslint-disable-next-line no-unused-vars
		addToCart({ commit }, params) {
			const product = this.getters.product;
			const cart = this.getters.cart;
			const line_id = this.state.lineIdCount + 1;
			let fields = {};

			fields.line_id = line_id;
			fields.id = product.guid;
			fields.name = product.product_name;
			fields.price = parseFloat(params.price);
			fields.amount = 1;
			fields.image = product.image;

			if(params.options !== undefined && params.options.length > 0) {
				fields.modifiers = [];
				params.options.forEach(optionId => {
					let group = product.options.find(options => {
						return options.values.some(value => {
							return value.id == optionId;
						})
					});
					let option = group.values.find(value => {
						return value.id == optionId;
					});
					let modifier = {
						id: option.guid,
						name: option.name,
						amount: 1,
						groupId: group.guid,
						groupName: group.name
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
		}
	}
});

export default store;
