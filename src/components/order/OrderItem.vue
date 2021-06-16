<template>
	<ion-card v-if="order !== false" class="order-tracking">
		<ion-card-header>
			<div class="flex-between">
				<span>№{{ order.id }}</span>
				<span>{{ order.time }} {{ order.date }}</span>
			</div>
		</ion-card-header>
		<ion-card-content>
			<order-item-position v-for="product in order.items" :key="product.id" :product="product"></order-item-position>

			<div class="flex-between order-total">
				<span>Итого</span>
				<span>{{ order.total_sum }} руб.</span>
			</div>

			<div v-if="order.bonuses > 0" class="flex-between order-bonus">
				<span>Оплачено бонусами</span>
				<span>{{ order.bonuses }} руб.</span>
			</div>

			<div v-if="order.store && order.store.store_name" class="order-address">{{ order.store.store_name }}</div>

			<!-- <ion-button class="btn-classic" v-if="order.status === 'ongoing'" expand="block">Отследить</ion-button> -->
			<!-- <ion-button class="btn-classic" v-else-if="order.status === 'delivered'" expand="block">Повторить заказ</ion-button> -->
		</ion-card-content>
	</ion-card>
	<ion-card v-else class="order-tracking">
		<ion-card-header>
			<div class="flex-between">
				<ion-skeleton-text animated style="width:3em"></ion-skeleton-text>
				<ion-skeleton-text animated style="width:9em"></ion-skeleton-text>
			</div>
		</ion-card-header>
		<ion-card-content>
			<order-item-position :product="false"></order-item-position>

			<div class="flex-between order-total">
				<ion-skeleton-text animated style="width:9em"></ion-skeleton-text>
			</div>

			<div class="order-address">
				<ion-skeleton-text animated style="width:12em"></ion-skeleton-text>
			</div>
		</ion-card-content>
	</ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardContent, IonSkeletonText } from '@ionic/vue';
import OrderItemPosition from './OrderItemPosition.vue';

export default {
	props: ['order'],
	components: {
		IonCard,
		IonCardHeader,
		IonCardContent,
		IonSkeletonText,
		OrderItemPosition
	}
}
</script>
