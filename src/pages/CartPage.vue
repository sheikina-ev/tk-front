<template>
	<base-layout page-title="Корзина [WIP]">
		<ion-list v-if="cart">
			<ion-item v-for="cartItem in cart" :key="cartItem.line_id" :amount="cartItem.amount">
				<cart-item :cartItem="cartItem"></cart-item>
			</ion-item>
		</ion-list>
		<ion-fab v-if="cart" vertical="bottom" horizontal="center" slot=fixed>
			<ion-fab-button>Заказать</ion-fab-button>
		</ion-fab>

		<h2 v-else>Корзина пуста</h2>
	</base-layout>
</template>

<script>
import { IonList, IonItem, IonFab, IonFabButton } from '@ionic/vue';
import CartItem from '../components/cart/CartItem.vue';

export default {
	components: {
		IonList,
		IonItem,
		IonFab,
		IonFabButton,
		CartItem
	},
	computed: {
		cart() {
			return this.$store.getters.cart;
		}
	}
};
</script>
