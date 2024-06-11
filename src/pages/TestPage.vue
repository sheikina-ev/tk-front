<template>
	<base-layout page-title="Тестовая страница">
		<ion-button expand="block" @click="openBrowser">Show Inappbrowser</ion-button>
	</base-layout>
</template>

<script>
import { IonButton } from '@ionic/vue';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import BaseLayout from "@/components/base/BaseLayout.vue";

export default {
	components: {BaseLayout, IonButton },
	methods: {
		openBrowser() {
			const iab = InAppBrowser;
			// eslint-disable-next-line no-unused-vars
			const browser = iab.create('https://google.com/', '_blank', {location: 'no', zoom: 'no'});

			console.log('click');
		}
	}
	
}
</script>
