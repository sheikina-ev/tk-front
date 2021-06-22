<template>
	<ion-col skeleton size="6">
		<ion-card class="coffee-card" router-direction="forward" :router-link="`/coffee/${coffeeItem.id}`">
			<div class="skeleton-wrap">
				<ion-img :src="coffeeItem.image"></ion-img>
			</div>
		</ion-card>
		<div class="coffee-item-info">
			<span class="ion-text-center coffee-item-name">{{ coffeeItem.product_name }}</span>
			<p v-if="coffeeItem.price" class="ion-text-center coffee-item-price">от {{ coffeeItem.price }}₽</p>
		</div>
	</ion-col>
</template>

<script>
import { IonCol, IonCard, IonImg } from '@ionic/vue';

export default {
	props: ['coffeeItem'],
	components: {
		IonCol,
		IonCard,
		IonImg
	}
}
</script>
