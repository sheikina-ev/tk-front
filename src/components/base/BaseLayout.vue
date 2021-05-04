<template>
	<ion-page id="main">
		<!-- <side-menu></side-menu> -->
		<ion-header>
			<ion-toolbar class="catalog-header">
				<ion-buttons slot="start">
					<ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
				</ion-buttons>
				<ion-title>{{ pageTitle }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<slot />
		</ion-content>
		<ion-footer>
			<ion-toolbar>
				<tabs-panel></tabs-panel>
			</ion-toolbar>
		</ion-footer>
	</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonBackButton, IonButtons, IonFooter } from '@ionic/vue';

export default {
	props: ['pageTitle', "pageDefaultBackLink"],
	components: {
		IonPage,
		IonHeader,
		IonTitle,
		IonContent,
		IonToolbar,
		IonBackButton,
		IonButtons,
		IonFooter
	}
}
</script>
