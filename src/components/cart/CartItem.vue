<template>
	<ion-grid>
		<ion-row>
			<ion-col size="4">
				<ion-img src="../assets/img/no-image-contrast.jpg"></ion-img>
				<span @click="removeCartItem(cartItem.line_id)">Удалить</span>
			</ion-col>
			<ion-col size="8">
				<span class="cart-item-name">{{ cartItem.product_name }}</span>
				<small>{{ cartItem.weight }} {{ cartItem.weight_unit }}</small>
				<div v-if="cartItem.cooking_time" class="cart-item-cooking-time-wrap">
					<ion-icon :icon="alarmOutline"></ion-icon>
					<small>Время приготовления</small>
					<span>~{{ cartItem.cooking_time }} мин</span>
				</div>
				<div class="cart-item-modifiers-wrap" v-if="cartItem.modifiers && cartItem.modifiers.length > 0">
					<strong>Добавки:</strong>
					<span v-for="modifier in cartItem.modifiers" :key="modifier.id">{{ modifier.name }}</span>
				</div>
				<div class="cart-item-amount-wrap">
					<button class="ion-activatable" @click="changeAmount(cartItem.line_id, 'decrease')">-<ion-ripple-effect type="unbounded"></ion-ripple-effect></button>
					<span>{{ cartItem.amount }}</span>
					<button class="ion-activatable" @click="changeAmount(cartItem.line_id, 'increase')">+<ion-ripple-effect type="unbounded"></ion-ripple-effect></button>
				</div>
				<div class="cart-item-price-wrap">
					<span>{{ cartItem.price * cartItem.amount }} рублей</span>
				</div>
			</ion-col>
		</ion-row>
	</ion-grid>
</template>

<script>
import { IonGrid, IonRow, IonCol, IonImg, IonIcon, IonRippleEffect } from '@ionic/vue';
import { alarmOutline } from 'ionicons/icons';

export default {
	props: ['cartItem'],
	components: {
		IonGrid,
		IonRow,
		IonCol,
		IonImg,
		IonIcon,
		IonRippleEffect
	},
	setup() {
		return {
			alarmOutline
		}
	},
	methods: {
		removeCartItem(lineId) {
			this.$store.commit('removeCartItem', {line_id: lineId});
			this.$store.commit('calculateCartTotal');
		},
		changeAmount(lineId, action) {
			this.$store.commit('changeAmount', {line_id: lineId, action: action});
			this.$store.commit('calculateCartTotal');
		}
	}
}
</script>
