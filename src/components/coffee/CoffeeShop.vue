<template>
	<div class="coffee-shop-wrap">
		<div class="name">
			<ion-icon color="medium" :icon="location"></ion-icon>
			<span v-if="shop">Меню {{ shop.address }}</span>
			<span v-else>Точка не выбрана</span>
		</div>
		<div class="link">
			<ion-button v-if="shop" router-link="/shop">Изменить</ion-button>
			<ion-button v-else router-link="/shop">Выбрать</ion-button>
		</div>
	</div>
</template>

<script>
import { IonIcon, IonButton } from '@ionic/vue';
import { location } from 'ionicons/icons';

export default {
	props: ['shop'],
	components: {
		IonIcon,
		IonButton
	},
	setup() {
		return {
			location
		}
	}
}
</script>
