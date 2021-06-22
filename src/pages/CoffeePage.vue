<template>
	<base-layout page-title="Каталог">
		<ion-refresher slot="fixed" @ionRefresh="doRefresh">
			<ion-refresher-content></ion-refresher-content>
		</ion-refresher>
		<coffee-shop :shop="activeShop"></coffee-shop>
		<coffee-sections-list :sections="sections" :sectionId="activeSection"></coffee-sections-list>
		<coffee-list v-if="activeSection > 0" :sectionId="activeSection" :key="activeSection"></coffee-list>
	</base-layout>
</template>

<script>
import { IonRefresher, IonRefresherContent } from '@ionic/vue';

import { chevronDownCircleOutline } from 'ionicons/icons';
import CoffeeShop from '../components/coffee/CoffeeShop.vue';
import CoffeeSectionsList from '../components/coffee/CoffeeSectionsList.vue';
import CoffeeList from '../components/coffee/CoffeeList.vue';

export default {
	components: {
		IonRefresher,
		IonRefresherContent,
		CoffeeShop,
		CoffeeSectionsList,
		CoffeeList
	},
	setup() {
		return { chevronDownCircleOutline };
	},
	async mounted() {
		const response = this.$store.dispatch('getCategories');

		if(response) {
			// All good
		} else {
			// Not good
		}
	},
	computed: {
		sections() {
			return this.$store.getters.sections;
		},
		activeSection() {
			return this.$store.getters.activeSection;
		},
		activeShop() {
			return this.$store.getters.activeShop;
		}
	},
	methods: {
		async doRefresh(e) {
			await this.$store.dispatch('getCategories');
			await this.$store.dispatch('getProducts', {params: {id: this.activeSection}});

			e.target.complete();
		}
	}
}
</script>
