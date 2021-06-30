<template>
	<ion-header>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-back-button defaultHref="/" text="" @click="dismissModal" :icon="chevronBack"></ion-back-button>
			</ion-buttons>
			<ion-title id="modal-title"></ion-title>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding modal-content">
		<ion-text id="modal-content"></ion-text>
		<ion-button class="modal-btn btn-classic" expand="block" @click="dismissModal">Закрыть</ion-button>
	</ion-content>
</template>

<script>
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonText, modalController } from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';

export default {
	props: ['code'],
	components: {
		IonContent,
		IonHeader,
		IonToolbar,
		IonButtons,
		IonBackButton,
		IonTitle,
		IonButton,
		IonText
	},
	setup() {
		return {
			chevronBack
		}
	},
	async mounted() {
		if(this.code !== undefined) {
			const data = await this.$store.dispatch('getInfoPage', this.code);
			const page = {
				title: document.getElementById('modal-title'),
				textNode: document.getElementById('modal-content')
			};

			if(data) {
				page.title.innerText = data.data.title;
				page.textNode.innerHTML = data.data.content;
			}
		}
	},
	methods: {
		async dismissModal(e) {
			e.preventDefault();

			await modalController.dismiss();
		}
	}
}
</script>
