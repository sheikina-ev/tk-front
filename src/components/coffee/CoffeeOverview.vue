<template>
	<ion-content>
		<div class="coffee-picture-container" :style="coffeeItem.image ? `background-image:url('`+coffeeItem.image+`')` : `background-image:url('../assets/img/no-image-contrast.jpg')`">
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
		<div v-if="coffeeItem.options && coffeeItem.options.length > 0" class="coffee-modifiers-container">
			<ion-list v-for="groups in coffeeItem.options" :key="groups.id">
				<ion-radio-group v-if="groups.max_amount === 1" :value="groups.min_amount === 1 || groups.required ? groups.values[0].id : ``">
					<h3>{{ groups.name }}</h3>
					<ion-item v-for="option in groups.values" :key="option.id">
						<ion-radio :value="option.id" slot="start"></ion-radio>
						<ion-label>{{ option.name }}</ion-label>
					</ion-item>
				</ion-radio-group>
				<div v-else-if="groups.max_amount > 1" class="checkbox-wrap">
					<h3>{{ groups.name }}</h3>
					<ion-item v-for="option in groups.values" :key="option.id">
						<ion-checkbox :value="option.id" slot="start"></ion-checkbox>
						<ion-label>{{ option.name }}</ion-label>
					</ion-item>
				</div>
			</ion-list>
		</div>
		<div class="coffee-calorific-info-container">
			<h3>Калорийность</h3>
			<div class="wrap">
				<div class="item">
					<div class="value">{{ coffeeItem.energyAmount && coffeeItem.energyAmount !== 'NaN' ? coffeeItem.energyAmount : 0 }}</div>
					<div class="label">Ккал</div>
				</div>
				<div class="item">
					<div class="value">{{ coffeeItem.proteinsAmount && coffeeItem.proteinsAmount !== 'NaN' ? coffeeItem.proteinsAmount : 0 }}</div>
					<div class="label">Белки, г</div>
				</div>
				<div class="item">
					<div class="value">{{ coffeeItem.fatAmount && coffeeItem.fatAmount !== 'NaN' ? coffeeItem.fatAmount : 0 }}</div>
					<div class="label">Жиры, г</div>
				</div>
				<div class="item">
					<div class="value">{{ coffeeItem.carbohydratesAmount && coffeeItem.carbohydratesAmount !== 'NaN' ? coffeeItem.carbohydratesAmount : 0 }}</div>
					<div class="label">Углеводы, г</div>
				</div>
			</div>
		</div>
		<div class="overview-dummy-block"></div>
		<div class="overview-button-wrap bottom-content h-center-content">
			<ion-button expand="block" @click="addToCart(coffeeItem.id)">
				<div class="content">
					<span><ion-icon :icon="cartOutline"></ion-icon>Заказать</span>
					<span>{{ coffeeItem.price }} руб.</span>
				</div>
			</ion-button>
		</div>
	</ion-content>
</template>

<script>
import { IonContent, toastController, IonIcon, IonButton, IonRadioGroup, IonRadio, IonCheckbox, IonLabel, IonList, IonItem } from '@ionic/vue';
import { heartOutline, thumbsDownOutline, alarmOutline, cartOutline } from 'ionicons/icons';

export default {
	props: ['coffeeItem'],
	components: {
		IonContent,
		IonIcon,
		IonButton,
		IonRadioGroup,
		IonRadio,
		IonCheckbox,
		IonLabel,
		IonList,
		IonItem
	},
	setup() {
		return {
			heartOutline,
			thumbsDownOutline,
			alarmOutline,
			cartOutline
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
		},
		async addToCart(id) {
			this.$store.commit('addToCart', {item_id: id});
			this.$store.commit('calculateCartTotal');

			const toast = await toastController.create({
				message: 'Добавлено в корзину',
				position: 'bottom',
				duration: 3000
			});
			await toast.present();
		}
	}
}
</script>
