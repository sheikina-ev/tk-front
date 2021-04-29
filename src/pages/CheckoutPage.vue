<template>
	<base-layout page-title="Оформить заказ">
		<ion-item>
			<ion-label position="stacked">Имя*</ion-label>
			<ion-input name="name" autocomplete="name" required="true"></ion-input>
		</ion-item>
		<ion-item>
			<ion-label position="stacked">Телефон*</ion-label>
			<ion-input name="tel" placeholder="+7 (___) ___ __ __" autocomplete="tel" type="tel" required="true"></ion-input>
		</ion-item>
		<ion-item>
			<ion-label position="stacked">Выбранный адрес*</ion-label>
			<ion-select name="shop" @click="test" :value="activeShop ? activeShop.id : ``" interface="popover" required="true">
				<ion-select-option v-for="shop in shops" :key="shop.id" :value="shop.id">{{ shop.address }}</ion-select-option>
				<!-- <ion-select-option v-if="activeShop" :value="activeShop ? activeShop.id : ``">{{ activeShop.address }}</ion-select-option> -->
			</ion-select>
		</ion-item>
		<ion-item>
			<ion-label position="stacked">Через какое время вы заберёте заказ</ion-label>
			<ion-select name="time-suggested" interface="popover" required="true" value="soon5">
				<ion-select-option value="soon5">Ближайшее время ~5 мин</ion-select-option>
				<ion-select-option value="soon10">Ближайшее время ~10 мин</ion-select-option>
				<ion-select-option value="soon15">Ближайшее время ~15 мин</ion-select-option>
				<ion-select-option value="custom">Указать точное время</ion-select-option>
			</ion-select>
		</ion-item>
		<ion-item>
			<ion-input name="time" placeholder="15:50"></ion-input>
		</ion-item>
		<ion-item>
			<ion-label position="stacked"><b>Мои баллы: 1000</b></ion-label>
			<ion-label position="stacked">Списать баллов</ion-label>
			<ion-input name="bonus"></ion-input>
		</ion-item>
		<div class="order-total-wrap">
			<b>Итого:</b>
			<b>{{ cartTotal ? cartTotal+' руб.' : '0 руб.' }}</b>
		</div>
		<ion-radio-group>
			<span class="order-payment-label">Способ оплаты</span>
			<ion-item>
				<ion-label>Apple Pay</ion-label>
				<ion-radio name="payment" value="apple"></ion-radio>
			</ion-item>
			<ion-item>
				<ion-label>Банковская карта</ion-label>
				<ion-radio name="payment" value="card"></ion-radio>
			</ion-item>
			<ion-item>
				<ion-label>Google Pay</ion-label>
				<ion-radio name="payment" value="google"></ion-radio>
			</ion-item>
		</ion-radio-group>
		<ion-button expand="block">Оплатить</ion-button>
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
