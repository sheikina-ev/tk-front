<template>
	<div v-if="product !== false" class="order-item-position-wrap">
		<div class="flex-between">
			<b v-if="product.name_product">{{ product.name_product }}</b>
			<span v-if="product.price_product"><small v-if="product.amount > 1">{{ product.amount }}x</small> {{ product.price_product }} руб.</span>
		</div>

		<div v-if="product.modifiers" class="flex-column">
			<b>Добавки:</b>
			<span v-for="modifier in product.modifiers" :key="modifier.id">{{ modifier.name_options }}</span>
		</div>
	</div>
	<div v-else class="order-item-position-wrap">
		<div class="flex-between">
			<ion-skeleton-text animated style="width:9em"></ion-skeleton-text>
			<ion-skeleton-text animated style="width:5em"></ion-skeleton-text>
		</div>

		<div class="flex-column">
			<ion-skeleton-text animated style="width:7em"></ion-skeleton-text>
			<ion-skeleton-text animated style="width:4em"></ion-skeleton-text>
			<ion-skeleton-text animated style="width:4em"></ion-skeleton-text>
			<ion-skeleton-text animated style="width:4em"></ion-skeleton-text>
		</div>
	</div>
</template>

<script>
import { IonSkeletonText } from '@ionic/vue';

export default {
	props: ['product'],
	components: {
		IonSkeletonText
	}
}
</script>
