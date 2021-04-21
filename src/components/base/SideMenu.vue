<template>
	<ion-menu side="end" type="overlay" menu-id="main" content-id="main">
		<ion-content>
			<ion-list>
				<ion-menu-toggle auto-hide="false">
					<ion-item router-direction="root" href="/coffee">Аккаунт</ion-item>
				</ion-menu-toggle>
				<ion-menu-toggle auto-hide="false">
					<ion-item router-direction="root" href="/coffee">Разделы и скидки</ion-item>
				</ion-menu-toggle>
				<ion-menu-toggle auto-hide="false">
					<ion-item router-direction="root" href="/coffee">Акции</ion-item>
				</ion-menu-toggle>
				<ion-menu-toggle auto-hide="false">
					<ion-item router-direction="root" href="/coffee">Истории заказов</ion-item>
				</ion-menu-toggle>
				<ion-menu-toggle auto-hide="false">
					<ion-item router-direction="root" href="/coffee">Оставить отзыв</ion-item>
				</ion-menu-toggle>
				<ion-menu-toggle auto-hide="false">
					<ion-item router-direction="root" href="/coffee">Сообщить о технической проблеме</ion-item>
				</ion-menu-toggle>
			</ion-list>
		</ion-content>
	</ion-menu>
</template>

<script>
import { IonContent, IonItem, IonList, IonMenu, IonMenuToggle } from '@ionic/vue';

export default {
	components: { IonContent, IonItem, IonList, IonMenu, IonMenuToggle }
};
</script>
