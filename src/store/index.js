import { createStore } from 'vuex';

const store = createStore({
	state: {
		sections: [],
		products: [],
		product: {},
		activeSection: 0,
		// WIP
		cart: [
			/* {
				line_id: 1,
				product_name: "Капучино",
				weight: 500,
				weight_unit: 'мл',
				cooking_time: "5",
				modifiers: [
					{
						id: 1,
						name: "Молоко"
					},
					{
						id: 2,
						name: "Сахар"
					},
					{
						id: 3,
						name: "Корица"
					},
					{
						id: 4,
						name: "Лимон"
					}
				],
				amount: 1,
				price: 300
			},
			{
				line_id: 2,
				product_name: "Латте",
				weight: 500,
				weight_unit: 'мл',
				cooking_time: "5",
				modifiers: [
					{
						id: 1,
						name: "Молоко"
					},
					{
						id: 2,
						name: "Сахар"
					},
					{
						id: 3,
						name: "Амаретто"
					}
				],
				amount: 1,
				price: 400
			},
			{
				line_id: 3,
				product_name: "Эспрессо",
				weight: 200,
				weight_unit: 'мл',
				cooking_time: "5",
				modifiers: [
					
				],
				amount: 1,
				price: 350
			} */
		],
		cartTotal: 0,
		lineIdCount: 0,
		// Placeholders
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
			const item_id = payload.item_id;
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
			state.lineIdCount = line_id;
		},
		calculateCartTotal(state) {
			var total = 0;
			const cart = state.cart;
			cart.forEach(item => {
				total += item.price * item.amount;
			});

			state.cartTotal = total;
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
		}
	}
});

export default store;
