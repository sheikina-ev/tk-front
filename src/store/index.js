import { createStore } from 'vuex';

const store = createStore({
	state: {
		sections: [],
		products: [],
		product: {},
		activeSection: 0,
		// WIP
		cart: [
			{
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
			}
		]
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
		// WIP
		cart(state) {
			return state.cart;
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
		// WIP
		changeAmount(state, payload) {
			const line_id = payload.line_id;
			const action = payload.action;
			const item = state.cart.find(item => item.line_id = line_id);
			
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
		},
		dropCart(state) {
			state.cart = [];
		}
	}
});

export default store;
