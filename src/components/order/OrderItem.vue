<template>
	<ion-card class="order-tracking">
		<ion-card-header>
			<div class="flex-between">
				<span>№{{ order.id }}</span>
				<span>{{ order.date }}</span>
			</div>
		</ion-card-header>
		<ion-card-content>
			<order-item-position v-for="product in order.items" :key="product.lineId" :product="product"></order-item-position>

			<div class="flex-between order-total">
				<span>Итого</span>
				<span>{{ order.total }} руб.</span>
			</div>

			<div class="order-address">{{ order.address }}</div>

			<ion-button class="btn-classic" v-if="order.status === 'ongoing'" expand="block">Отследить</ion-button>
			<ion-button class="btn-classic" v-else-if="order.status === 'delivered'" expand="block">Повторить заказ</ion-button>
		</ion-card-content>
	</ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardContent, IonButton } from '@ionic/vue';
import OrderItemPosition from './OrderItemPosition.vue';

export default {
	props: ['order'],
	components: {
		IonCard,
		IonCardHeader,
		IonCardContent,
		IonButton,
		OrderItemPosition
	}
}
</script>
