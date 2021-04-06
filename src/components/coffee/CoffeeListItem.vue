<template>
	<ion-col size="6">
		<ion-card class="coffee-card" :style="`background-image:url('${coffeeItem.image}')`" :router-link="`/coffee/${coffeeItem.id}`"></ion-card>
		<h2 class="ion-text-center">{{ coffeeItem.title }}</h2>
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
