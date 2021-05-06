<template>
	<base-layout page-title="Оформить заказ">
		<ion-item lines="none" class="checkout-page-input">
			<ion-label position="stacked">Имя*</ion-label>
			<ion-input name="name" autocomplete="name" required="true"></ion-input>
		</ion-item>
		<ion-item lines="none" class="checkout-page-input">
			<ion-label position="stacked">Телефон*</ion-label>
			<ion-input name="tel" placeholder="+7 (___) ___ __ __" autocomplete="tel" type="tel" required="true"></ion-input>
		</ion-item>
		<ion-item lines="none" class="checkout-page-select">
			<ion-label position="stacked">Выбранный адрес*</ion-label>
			<ion-select name="shop" @click="test" :value="activeShop ? activeShop.id : ``" interface="popover" required="true">
				<ion-select-option v-for="shop in shops" :key="shop.id" :value="shop.id">{{ shop.store_name }}</ion-select-option>
				<!-- <ion-select-option v-if="activeShop" :value="activeShop ? activeShop.id : ``">{{ activeShop.store_name }}</ion-select-option> -->
			</ion-select>
		</ion-item>
		<ion-item lines="none" class="checkout-page-input">
			<ion-label class="checkout-page-total" position="stacked"><b>Мои баллы: 1000</b></ion-label>
			<ion-label position="stacked">Списать баллов</ion-label>
			<ion-input name="bonus"></ion-input>
		</ion-item>
		<div class="order-total-wrap">
			<b>Итого:</b>
			<b>{{ cartTotal ? cartTotal+' руб.' : '0 руб.' }}</b>
		</div>
		<ion-radio-group>
			<span class="order-payment-label">Способ оплаты</span>
			<ion-item lines="none">
				<ion-label class="img-apple"></ion-label>
				<ion-radio name="payment" value="apple"></ion-radio>
			</ion-item>
			<ion-item lines="none">
				<ion-label class="img-visa"></ion-label>
				<ion-radio name="payment" value="card"></ion-radio>
			</ion-item>
			<ion-item lines="none">
				<ion-label class="img-google"></ion-label>
				<ion-radio name="payment" value="google"></ion-radio>
			</ion-item>
		</ion-radio-group>
		<ion-button expand="block btn-classic checkout-page-btn">Оплатить</ion-button>
	</base-layout>
</template>

<script>
import { IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonRadio, IonRadioGroup, IonButton } from '@ionic/vue';

export default {
	components: {
		IonItem,
		IonLabel,
		IonInput,
		IonSelect,
		IonSelectOption,
		IonRadio,
		IonRadioGroup,
		IonButton
	},
	computed: {
		shops() {
			return this.$store.getters.shops;
		},
		activeShop() {
			return this.$store.getters.activeShop;
		},
		cartTotal() {
			return this.$store.getters.cartTotal;
		}
	},
	methods: {
		test(e) {
			e.preventDefault();
			console.log('click');
		}
	}
}
</script>
