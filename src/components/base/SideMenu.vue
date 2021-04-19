<template>
	<ion-menu side="end" type="overlay" menu-id="main" content-id="main">
		<ion-content>
			<ion-list>
				<ion-item>Аккаунт</ion-item>
				<ion-item>Разделы и скидки</ion-item>
				<ion-item>Акции</ion-item>
				<ion-item>Истории заказов</ion-item>
				<ion-item>Оставить отзыв</ion-item>
				<ion-item>Сообщить о технической проблеме</ion-item>
			</ion-list>
		</ion-content>
	</ion-menu>
</template>

<script>
import { IonContent, IonItem, IonList, IonMenu } from '@ionic/vue';

export default {
	components: { IonContent, IonItem, IonList, IonMenu }
};
</script>
