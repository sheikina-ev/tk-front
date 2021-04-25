<template>
	<ion-col size="12">
		<ion-card>
			<ion-card-content>
				<ion-card-title>{{ special.title }}</ion-card-title>
				<ion-card-subtitle>{{ special.subtitle }}</ion-card-subtitle>
				<p>{{ special.description }}</p>
			</ion-card-content>
		</ion-card>
	</ion-col>
</template>

<script>
import { IonCol, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/vue';

export default {
	props: ['special'],
	components: {
		IonCol,
		IonCard,
		IonCardTitle,
		IonCardSubtitle,
		IonCardContent,
	}
}
</script>
