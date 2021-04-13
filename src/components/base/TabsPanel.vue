<template>
	<ion-tabs>
		<ion-tab-bar slot="bottom">
			<ion-tab-button tab="null">
				<ion-icon :icon="homeOutline"></ion-icon>
			</ion-tab-button>
			<ion-tab-button tab="null">
				<ion-icon :icon="basketOutline"></ion-icon>
			</ion-tab-button>
			<ion-tab-button tab="null">
				<ion-icon :icon="menuOutline"></ion-icon>
			</ion-tab-button>
		</ion-tab-bar>
	</ion-tabs>
</template>

<script>
import { IonTabs, IonTabBar, IonTabButton, IonIcon } from '@ionic/vue';
import { homeOutline, basketOutline, menuOutline } from 'ionicons/icons';

export default {
	components: {
		IonTabs,
		IonTabBar,
		IonTabButton,
		IonIcon
	},
	setup() {
		return {
			homeOutline,
			basketOutline,
			menuOutline
		}
	}
};
</script>
