<template>
	<ion-header>
		<ion-toolbar>
			<ion-title>{{ title }}</ion-title>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding modal-content">
		{{ content }}
		<ion-button class="modal-btn btn-classic" expand="block" @click="dismissModal">Закрыть</ion-button>
	</ion-content>
</template>

<script>
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, modalController } from '@ionic/vue';

export default {
	props: ['title', 'content'],
	components: {
		IonContent,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonButton
	},
	methods: {
		async dismissModal() {
			await modalController.dismiss();
		}
	}
}
</script>
