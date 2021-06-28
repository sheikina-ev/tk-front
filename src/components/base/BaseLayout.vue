<template>
	<ion-page id="main">
		<!-- <side-menu></side-menu> -->
		<ion-header>
			<ion-toolbar class="catalog-header">
				<ion-buttons slot="start">
				</ion-buttons>
				<ion-title>{{ pageTitle }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<slot />
		</ion-content>
		<ion-footer>
			<ion-toolbar class="bottom-bar">
				<tabs-panel></tabs-panel>
			</ion-toolbar>
		</ion-footer>
	</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonButtons, IonFooter } from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';

export default {
	props: ['pageTitle'],
	components: {
		IonPage,
		IonHeader,
		IonTitle,
		IonContent,
		IonToolbar,
		IonButtons,
		IonFooter
	},
	setup() {
		return {
			chevronBack
		}
	}
}
</script>
