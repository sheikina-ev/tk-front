<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/coffee" text="" :icon="chevronBack"></ion-back-button>
				</ion-buttons>
				<ion-title>{{ coffeeItem && Object.keys(coffeeItem).length > 0 ? coffeeItem.product_name : 'Загрузка...' }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<coffee-overview :coffeeItem="coffeeItem"></coffee-overview>
		</ion-content>
	</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonBackButton, IonButtons } from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import CoffeeOverview from '../components/coffee/CoffeeOverview.vue';

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
	setup() {
		return {
			chevronBack
		}
	},
	async mounted() {
		this.$store.commit('clearState', 'product');

		this.$store.dispatch('getProduct', {params: {id: this.productId}});
	},
	computed: {
		coffeeItem() {
			var product = this.$store.getters.product;
			if(product) {
				product.carbohydratesAmount = parseFloat(product.carbohydratesAmount).toFixed(1);
				product.energyAmount = parseFloat(product.energyAmount).toFixed(1);
				product.fatAmount = parseFloat(product.fatAmount).toFixed(1);
				product.proteinsAmount = parseFloat(product.proteinsAmount).toFixed(1);
			}

			return product;
		}
	}
}
</script>
