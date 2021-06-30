<template>
	<ion-page id="main">
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
import { IonPage, IonContent, IonFooter, IonToolbar } from '@ionic/vue';

export default {
	props: ['pageTitle', "pageDefaultBackLink"],
	components: {
		IonPage,
		IonContent,
		IonFooter,
		IonToolbar
	}
}
</script>
