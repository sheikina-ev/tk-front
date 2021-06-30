<template>
	<ion-col v-if="special !== false" size="12">
		<ion-card class="special-content" :style="`background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(`+(special.image ? special.image : 'assets/img/no-image.jpg')+`)`">
			<ion-card-title>{{ special.title }}</ion-card-title>
			<ion-card-subtitle>{{ special.subtitle }}</ion-card-subtitle>
		</ion-card>
		<p v-html="special.content"></p>
	</ion-col>
	<ion-col v-else size="12">
		<ion-card class="special-content">
			<ion-card-title>
				<ion-skeleton-text animated></ion-skeleton-text>
			</ion-card-title>
			<ion-card-subtitle>
				<ion-skeleton-text animated></ion-skeleton-text>
			</ion-card-subtitle>
		</ion-card>
	</ion-col>
</template>

<script>
import { IonCol, IonCard, IonCardTitle, IonCardSubtitle, IonSkeletonText } from '@ionic/vue';

export default {
	props: ['special'],
	components: {
		IonCol,
		IonCard,
		IonCardTitle,
		IonCardSubtitle,
		IonSkeletonText
	}
}
</script>
