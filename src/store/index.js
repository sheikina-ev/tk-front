import { createStore } from 'vuex';

const store = createStore({
	state: {
		sections: [],
		products: [],
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
			return (productId) => {
				return state.products.find(product => product.id === productId);
			};
		}
	},
	mutations: {
		setActiveSection(state, id) {
			state.activeSection = id;
		},
		updateSections(state, sections) {
			state.sections = sections;
		},
		clearProducts(state) {
			state.products = [];
		},
		updateProducts(state, products) {
			state.products = products;
		}
	}
});

export default store;
