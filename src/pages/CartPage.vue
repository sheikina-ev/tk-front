<template>
	<base-layout page-title="Корзина">
		<ion-list v-if="cart.length > 0">
			<ion-item v-for="cartItem in cart" :key="cartItem.line_id" :amount="cartItem.amount">
				<cart-item :cartItem="cartItem"></cart-item>
			</ion-item>
		</ion-list>
		<div v-if="cart.length > 0" class="bottom-content cart-button-wrap" slot="fixed">
			<ion-button expand="block" router-link="/checkout">
				<div class="content">
					<span><ion-icon class="d-none" :icon="cartOutline"></ion-icon>Заказать</span>
					<span>{{ cartTotal }} руб.</span>
				</div>
			</ion-button>
		</div>

		<div class="center-content" v-else>
			<h2 class="text-center">Корзина пуста</h2>
		</div>
		<div class="dummy-block"></div>
	</base-layout>
</template>

<script>
import { IonList, IonItem, IonButton, IonIcon } from '@ionic/vue';
import { cartOutline } from 'ionicons/icons';
import CartItem from '../components/cart/CartItem.vue';

export default {
	components: {
		IonList,
		IonItem,
		IonButton,
		IonIcon,
		CartItem
	},
	setup() {
		return {
			cartOutline
		}
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
