<template>
	<ion-col size="6">
		<ion-card class="coffee-card" :style="coffeeItem.image ? `background-image:url('`+coffeeItem.image+`')` : `background-image:url('../assets/img/no-image.jpg')`" router-direction="forward" :router-link="`/coffee/${coffeeItem.id}`"></ion-card>
		<div class="coffee-item-info">
			<span class="ion-text-center coffee-item-name">{{ coffeeItem.product_name }}</span>
			<p :v-if="coffeeItem.price" class="ion-text-center coffee-item-price">от {{ coffeeItem.price }}₽</p>
		</div>
	</ion-col>
</template>

<script>
import { IonCol, IonCard } from '@ionic/vue';

export default {
	props: ['coffeeItem'],
	components: {
		IonCol,
		IonCard
	}
}
</script>
