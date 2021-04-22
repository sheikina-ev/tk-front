<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/coffee"></ion-back-button>
				</ion-buttons>
				<ion-title>{{ coffeeItem ? coffeeItem.product_name : 'Загрузка...' }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<h2 v-if="!coffeeItem">Item not found</h2>
			<coffee-overview v-else :coffeeItem="coffeeItem"></coffee-overview>
		</ion-content>
	</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonBackButton, IonButtons, loadingController } from '@ionic/vue';
import CoffeeOverview from '../components/coffee/CoffeeOverview.vue';
import axios from 'axios';

export default {
	components: {
		IonPage,
		IonHeader,
		IonTitle,
		IonContent,
		IonToolbar,
		IonBackButton,
		IonButtons,
		CoffeeOverview
	},
	data() {
		return {
			productId: this.$route.params.id
		}
	},
	async mounted() {
		const loading = await loadingController.create({
			cssClass: 'loading-obj',
			message: 'Пожалуйста подождите'
		});

		this.$store.commit('clearState', 'product');
		await loading.present();

		await axios.get('https://coffee.dev.webstripe.ru/public/api/catalog/getProduct', {params: {id: this.productId}}).then((response) => {
			this.$store.commit('setProduct', response.data.product);
			loading.dismiss();
		}).catch((err) => {
			console.log(err);
			loading.dismiss();
		});
	},
	computed: {
		coffeeItem() {
			return this.$store.getters.product;
		}
	}
}
</script>
