<template>
	<ion-content>
		<div class="coffee-picture-container" :style="coffeeItem.image ? `background-image: url()` : `background-image: url('../assets/img/no-image-contrast.jpg')`">
			<div class="coffee-picture-info-wrap">
				<div class="coffee-picture-info-top">
					<span @click="likeCoffee" class="inline-flex flex-end">0 человек оценили<ion-icon :icon="heartOutline"></ion-icon></span>
					<span class="inline-flex flex-end">0 человек недовольны<ion-icon :icon="thumbsDownOutline"></ion-icon></span>
				</div>
				<div class="coffee-picture-info-bottom">
					<span class="inline-flex flex-start"><ion-icon :icon="alarmOutline"></ion-icon>Время приготовления: ~5 мин</span>
				</div>
			</div>
		</div>
		<div class="coffee-info-container">
			<p v-if="coffeeItem.product_description" class="">{{ coffeeItem.product_description }}</p>
			<p v-else class=""><i>Описание отсутствует</i></p>
		</div>
	</ion-content>
</template>

<script>
import { IonContent, toastController, IonIcon } from '@ionic/vue';
import { heartOutline, thumbsDownOutline, alarmOutline } from 'ionicons/icons';

export default {
	props: ['coffeeItem'],
	components: {
		IonContent,
		IonIcon
	},
	setup() {
		return {
			heartOutline,
			thumbsDownOutline,
			alarmOutline
		}
	},
	methods: {
		async likeCoffee() {
			const toast = await toastController.create({
				message: 'Thanks! :)',
				position: 'bottom',
				duration: 3000
			});
			await toast.present();
		}
	}
}
</script>
