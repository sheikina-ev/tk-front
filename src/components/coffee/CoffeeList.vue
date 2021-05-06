<template>
	<ion-grid>
		<ion-row v-if="products.length > 0">
			<coffee-list-item v-for="coffeeItem in products" :key="coffeeItem.id" :coffeeItem="coffeeItem"></coffee-list-item>
		</ion-row>
		<ion-row v-else>
			<ion-col>
				<h2 class="text-center">Раздел пуст</h2>
			</ion-col>
		</ion-row>
	</ion-grid>
</template>

<script>
import { IonGrid, IonRow, IonCol } from '@ionic/vue';
import CoffeeListItem from './CoffeeListItem.vue';

export default {
	props: ['sectionId'],
	components: {
		IonGrid,
		IonRow,
		IonCol,
		CoffeeListItem
	},
	async mounted() {
		this.$store.dispatch('getProducts', {params: {id: this.$props.sectionId}});
	},
	computed: {
		products() {
			return this.$store.getters.products;
		}
	}
}
</script>
