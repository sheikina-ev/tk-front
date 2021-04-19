import { createStore } from 'vuex';

const store = createStore({
	state: {
		sections: [],
		products: [],
		product: {},
		activeSection: 0
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
		}
	}
});

export default store;
