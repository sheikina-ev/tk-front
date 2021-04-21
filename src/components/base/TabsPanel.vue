<template>
	<ion-tabs>
		<ion-tab-bar>
			<ion-tab-button tab="coffee" router-direction="root" href="/coffee">
				<ion-icon :icon="homeOutline"></ion-icon>
			</ion-tab-button>
			<ion-tab-button tab="cart" router-direction="root" href="/cart">
				<ion-icon :icon="basketOutline"></ion-icon>
			</ion-tab-button>
			<ion-tab-button tab="null" @click="openMenu">
				<ion-icon :icon="menuOutline"></ion-icon>
			</ion-tab-button>
		</ion-tab-bar>
	</ion-tabs>
</template>

<script>
import { IonTabs, IonTabBar, IonTabButton, IonIcon, menuController } from '@ionic/vue';
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
	},
	methods: {
		openMenu() {
			menuController.enable(true, 'main');
			menuController.open('main');
		}
	}
};
</script>
