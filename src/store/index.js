import { createStore } from 'vuex';

const store = createStore({
	state() {
		return {
			coffeeList: [
				{
					id: 'cappuccino',
					image: 'assets/img/cappuccino.jpg',
					title: 'Cappuccino',
					description: 'An espresso-based coffee drink that originated in Italy, and is traditionally prepared with steamed milk foam.'
				},
				{
					id: 'latte',
					image: 'assets/img/latte.jpg',
					title: 'Latte',
					description: 'A coffee drink made with espresso and steamed milk.'
				},
				{
					id: 'espresso',
					image: 'assets/img/espresso.jpg',
					title: 'Espresso',
					description: 'A coffee-brewing method of Italian origin, in which a small amount of nearly boiling water is forced under 9–10 bars of pressure through finely-ground coffee beans.'
				},
				{
					id: 'affogato',
					image: 'assets/img/shit.jpg',
					title: 'Affogato',
					description: 'Some other fancy shit.'
				}
			]
		}
	},
	getters: {
		coffeeList(state) {
			return state.coffeeList
		},
		coffee(state) {
			return (coffeeId) => {
				return state.coffeeList.find(coffee => coffee.id === coffeeId);
			};
		}
	}
});

export default store;
