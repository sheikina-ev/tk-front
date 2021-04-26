<template>
	<ion-menu side="end" type="overlay" menu-id="main" content-id="main">
		<ion-header>
			<ion-toolbar>
				<ion-title>
					Меню
				</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-list>
				<ion-menu-toggle auto-hide="false">
					<ion-item router-direction="root" :color="isActive('/auth') ? 'primary' : '' " router-link="/auth">Аккаунт</ion-item>
				</ion-menu-toggle>
				<ion-menu-toggle auto-hide="false">
					<ion-item router-direction="root" :color="isActive('/coffee') ? 'primary' : '' " router-link="/coffee">Разделы и скидки</ion-item>
				</ion-menu-toggle>
				<ion-menu-toggle auto-hide="false">
					<ion-item router-direction="root" :color="isActive('/specials') ? 'primary' : '' " router-link="/specials">Акции</ion-item>
				</ion-menu-toggle>
				<ion-menu-toggle auto-hide="false">
					<ion-item router-direction="root" :color="isActive('/orders') ? 'primary' : '' " router-link="/orders">Истории заказов</ion-item>
				</ion-menu-toggle>
				<ion-menu-toggle auto-hide="false">
					<ion-item router-direction="root" :color="isActive('/review') ? 'primary' : '' " router-link="/review">Оставить отзыв</ion-item>
				</ion-menu-toggle>
				<ion-menu-toggle auto-hide="false">
					<ion-item router-direction="root" :color="isActive('/feedback') ? 'primary' : '' " router-link="/feedback">Сообщить о технической проблеме</ion-item>
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
	}
};
</script>
