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
import { IonGrid, IonRow, IonCol, loadingController } from '@ionic/vue';
import CoffeeListItem from './CoffeeListItem.vue';
import axios from 'axios';

export default {
	props: ['sectionId'],
	components: {
		IonGrid,
		IonRow,
		IonCol,
		CoffeeListItem
	},
	async mounted() {
		const loading = await loadingController.create({
			cssClass: 'loading-obj',
			message: 'Пожалуйста подождите'
		});

		// this.$store.commit('clearState', 'products');
		await loading.present();

		await axios.get('https://coffee.dev.webstripe.ru/public/api/catalog/getProducts', {params: {id: this.$props.sectionId}}).then((response) => {
			this.$store.commit('updateProducts', response.data.products);
			loading.dismiss();
		}).catch((err) => {
			console.log(err);
			loading.dismiss();
		});
	},
	computed: {
		products() {
			return this.$store.getters.products;
		}
	}
}
</script>
