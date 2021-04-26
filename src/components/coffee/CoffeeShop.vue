<template>
	<div v-if="shop" class="coffee-shop-wrap">
		<div class="name">
			<ion-icon color="medium" :icon="location"></ion-icon>
			<span>Меню {{ shop.address }}</span>
		</div>
		<div class="link">
			<ion-button router-link="/shop">Изменить</ion-button>
		</div>
	</div>
	<div v-else class="text-center">
		<h2>Точка не выбрана</h2>
		<ion-button router-link="/shop">Выбрать</ion-button>
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
