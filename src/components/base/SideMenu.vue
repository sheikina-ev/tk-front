<template>
	<ion-menu swipeGesture="false" side="end" type="overlay" menu-id="main" content-id="main">
		<ion-header class="d-none">
			<ion-toolbar>
				<ion-title>
					Меню
				</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="hide-menu main-menu">
			<ion-list>
				<ion-menu-toggle auto-hide="false">
					<ion-item v-if="isAuthorized" router-direction="/coffee" :color="isActive('/auth') ? 'primary' : '' " router-link="/auth">Аккаунт +{{ user.phone }}</ion-item>
					<ion-item v-else router-direction="/coffee" :color="isActive('/auth') ? 'primary' : '' " router-link="/auth">Аккаунт</ion-item>
				</ion-menu-toggle>
				<ion-menu-toggle auto-hide="false">
					<ion-item router-direction="root" :color="isActive('/coffee') ? 'primary' : '' " router-link="/coffee">Каталог</ion-item>
				</ion-menu-toggle>
				<ion-menu-toggle auto-hide="false">
					<ion-item router-direction="/coffee" :color="isActive('/specials') ? 'primary' : '' " router-link="/specials">Акции</ion-item>
				</ion-menu-toggle>
				<ion-menu-toggle auto-hide="false">
					<ion-item router-direction="/coffee" :color="isActive('/orders') ? 'primary' : '' " router-link="/orders">Истории заказов</ion-item>
				</ion-menu-toggle>
				<ion-menu-toggle auto-hide="false">
					<ion-item router-direction="/coffee" :color="isActive('/review') ? 'primary' : '' " router-link="/review">Оставить отзыв</ion-item>
				</ion-menu-toggle>
				<ion-menu-toggle auto-hide="false">
					<ion-item router-direction="/coffee" :color="isActive('/feedback') ? 'primary' : '' " router-link="/feedback">Сообщить о технической проблеме</ion-item>
				</ion-menu-toggle>
			</ion-list>
		</ion-content>
	</ion-menu>
</template>

<script>
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonMenu, IonMenuToggle } from '@ionic/vue';

export default {
	components: { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonMenu, IonMenuToggle },
	methods: {
		isActive(path) {
			return this.$route.path == path;
		}
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
		isAuthorized() {
			return this.$store.getters.isAuthorized;
		}
	}
};
</script>
