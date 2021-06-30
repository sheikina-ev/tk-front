<template>
	<ion-app>
		<side-menu></side-menu>
		<ion-router-outlet id="main" />
	</ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, useBackButton, useIonRouter } from '@ionic/vue';
import { Plugins } from '@capacitor/core';
import { defineComponent } from 'vue';
const { App } = Plugins;

export default defineComponent({
	name: 'App',
	components: {
		IonApp,
		IonRouterOutlet
	},
	setup() {
		const ionRouter = useIonRouter();
		useBackButton(-1, () => {
			if(!ionRouter.canGoBack()) {
				App.exitApp();
			}
		});
	},
});
</script>