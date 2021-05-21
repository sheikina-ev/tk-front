<template>
	<ion-header class="modal-header">
			<ion-title>{{ title }}</ion-title>
			<span @click="dismissModal" class="modal-close"><ion-icon :icon="closeOutline"></ion-icon></span>
	</ion-header>
	<ion-content class="ion-padding modal-content">
		{{ content }}
		<ion-button class="modal-btn btn-classic" expand="block" @click="dismissModal">Закрыть</ion-button>
	</ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonIcon, IonButton, modalController } from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';

export default {
	props: ['title', 'content'],
	components: {
		IonContent,
		IonHeader,
		IonIcon,
		IonTitle,
		IonButton
	},
	setup() {
		return {
			closeOutline
		}
	},
	methods: {
		async dismissModal() {
			await modalController.dismiss();
		}
	}
}
</script>
