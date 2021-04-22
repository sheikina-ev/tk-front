<template>
	<ion-header>
		<ion-toolbar>
			<ion-title>{{ title }}</ion-title>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding">
		{{ content }}
		<ion-button expand="block" @click="dismissModal">Закрыть</ion-button>
	</ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, modalController } from '@ionic/vue';

export default {
	props: ['title', 'content'],
	components: {
		IonContent,
		IonHeader,
		IonTitle,
		IonToolbar,
		IonButton
	},
	methods: {
		async dismissModal() {
			await modalController.dismiss();
		}
	}
}
</script>
