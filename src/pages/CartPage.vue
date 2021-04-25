<template>
	<base-layout page-title="Корзина [WIP]">
		<ion-list v-if="cart.length > 0">
			<ion-item v-for="cartItem in cart" :key="cartItem.line_id" :amount="cartItem.amount">
				<cart-item :cartItem="cartItem"></cart-item>
			</ion-item>
		</ion-list>
		<ion-fab v-if="cart.length > 0" vertical="bottom" horizontal="center" slot=fixed>
			<ion-fab-button>{{ cartTotal }} руб.</ion-fab-button>
		</ion-fab>

		<div class="center-content" v-else>
			<h2 class="text-center">Корзина пуста</h2>
		</div>
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
		},
		cartTotal() {
			return this.$store.getters.cartTotal;
		}
	}
};
</script>
