<template>
	<topless-layout>
		<ion-content class="background-image">
			<div class="checkout-result-wrap center-content">
				<ion-text color="light"><h1 class="text-center"><b>Спасибо за заказ! &#128523;</b></h1></ion-text>
				<ion-text color="light"><p class="text-center">Номер вашего заказа: {{ orderId }}</p></ion-text>
				<ion-text v-if="shop !== undefined" color="light"><p class="text-center">Адрес выбранной точки: {{ shop.store_name }}</p></ion-text>
				<ion-button expand="full" fill="clear" router-direction="/coffee" router-link="/orders">Мои заказы</ion-button>
			</div>
		</ion-content>
	</topless-layout>
</template>

<script>
import { IonContent, IonText, IonButton } from '@ionic/vue';

export default {
	components: {
		IonContent,
		IonText,
		IonButton
	},
	computed: {
		shop() {
			const shopId = this.$route.query.shopId || false;
			return this.$store.getters.shop(shopId);
		},
		orderId() {
			return this.$route.query.orderId;
		}
	}
}
</script>
