<template>
	<ion-tabs>
		<ion-tab-bar class="bottom-bar">
			<ion-tab-button tab="coffee" router-direction="root" href="/coffee">
				<ion-icon :icon="homeOutline"></ion-icon>
			</ion-tab-button>
			<ion-tab-button tab="cart" router-direction="root" href="/cart">
				<ion-icon :icon="basketOutline"></ion-icon>
				<ion-badge v-if="cartCount > 0" color="primary">{{ cartCount }}</ion-badge>
			</ion-tab-button>
			<ion-tab-button tab="null" @click="openMenu">
				<ion-icon :icon="menuOutline"></ion-icon>
			</ion-tab-button>
		</ion-tab-bar>
	</ion-tabs>
</template>

<script>
import { IonTabs, IonTabBar, IonTabButton, IonIcon, menuController, IonBadge } from '@ionic/vue';
import { homeOutline, basketOutline, menuOutline } from 'ionicons/icons';

export default {
	components: {
		IonTabs,
		IonTabBar,
		IonTabButton,
		IonIcon,
		IonBadge
	},
	setup() {
		return {
			homeOutline,
			basketOutline,
			menuOutline
		}
	},
	computed: {
		cartCount() {
			return this.$store.getters.cartCount;
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
