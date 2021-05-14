<template>
	<base-layout page-title="Оформить заказ">
		<form id="checkout-form" @submit="submitOrder">
			<ion-item lines="none" class="checkout-page-input">
				<ion-label position="stacked">Имя*</ion-label>
				<ion-input name="name" autocomplete="name" required="true" :value="user && Object.keys(user).length !== 0 ? user.name : ``"></ion-input>
			</ion-item>
			<ion-item lines="none" class="checkout-page-input">
				<ion-label position="stacked">Телефон*</ion-label>
				<ion-input :disabled="isAuthorized && user && Object.keys(user).length !== 0 ? `true` : `false`" @ionInput="format" name="phone" placeholder="79998887766" autocomplete="tel" type="tel" required="true" :value="isAuthorized && user && Object.keys(user).length !== 0 ? user.phone : ``"></ion-input>
				<ion-button fill="clear" v-if="isAuthorized" @click="changePhoneNumber">Изменить номер</ion-button>
				<div class="flex-center full-width">
					<ion-button v-if="!isAuthorized" color="secondary" @click="requestConfirmationCode">Подтвердить номер</ion-button>
				</div>
			</ion-item>
			<ion-item lines="none" class="checkout-page-select">
				<ion-label position="stacked">Выбранный адрес*</ion-label>
				<ion-select name="terminalGroupId" :value="activeShop ? activeShop.guid : ``" interface="popover" required="true">
					<ion-select-option v-for="shop in shops" :key="shop.guid" :value="shop.guid">{{ shop.store_name }}</ion-select-option>
				</ion-select>
			</ion-item>
			<!-- <ion-item lines="none" class="checkout-page-input">
				<ion-label class="checkout-page-total" position="stacked"><b>Мои баллы: 1000</b></ion-label>
				<ion-label position="stacked">Списать баллов</ion-label>
				<ion-input name="bonus"></ion-input>
			</ion-item> -->
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
			<ion-button expand="block btn-classic checkout-page-btn" type="submit" :disabled="isAuthorized ? `false` : `true`">Оплатить</ion-button>
		</form>
	</base-layout>
</template>

<script>
import { IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonRadio, IonRadioGroup, IonButton, alertController, toastController } from '@ionic/vue';
import { useRouter } from 'vue-router';

// For testing purposes
import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;

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
	setup() {
		const router = useRouter();
		return {
			router
		};
	},
	computed: {
		shops() {
			const shops = this.$store.getters.shops;
			if(shops.length <= 0) this.$store.dispatch('getStores');
			return shops;
		},
		activeShop() {
			return this.$store.getters.activeShop;
		},
		cart() {
			return this.$store.getters.cart;
		},
		cartTotal() {
			return this.$store.getters.cartTotal;
		},
		user() {
			return this.$store.getters.user;
		},
		isAuthorized() {
			return this.$store.getters.isAuthorized;
		}
	},
	methods: {
		async changePhoneNumber() {
			const alert = await alertController.create({
				header: 'Изменить номер',
				message: 'Обратите внимание: если вы измените номер телефона, то корзина будет очищена и баланс баллов изменится',
				buttons: [
					{
						text: 'Отмена',
						role: 'cancel'
					},
					{
						text: 'OK',
						handler: () => {
							this.$store.dispatch('logout');
						}
					}
				]
			});

			return alert.present();
		},
		/* async requestConfirmationCode() {
			const checkoutForm = document.getElementById('checkout-form');
			const formData = new FormData(checkoutForm);
			let formFields = {};

			for(var key of formData.keys()) {
				formFields[key] = formData.get(key).trim();
			}

			if(formFields['name'].length > 0 && formFields['phone'].length > 0) {
				console.log('good');
			} else {
				if(formFields['name'].length <= 0 && formFields['phone'].length <= 0) this.throwToast('Заполните поля "Имя" и "Телефон"');
				else if(formFields['name'].length <= 0) this.throwToast('Заполните поле "Имя"');
				else if(formFields['phone'].length <= 0) this.throwToast('Заполните поле "Телефон"');
			}
		}, */
		async submitOrder(e) {
			e.preventDefault();
			let items = JSON.parse(JSON.stringify(this.cart));
			let orderFields = {};
			let formFields = {};
			const formData = new FormData(e.target);

			for(var key of formData.keys()) {
				formFields[key] = formData.get(key);
			}

			// Filter item fields
			let itemsFilter = ['type', 'productId', 'amount', 'modifiers'];
			let modifiersFilter = ['productId', 'amount', 'productGroupId'];
			items.forEach(function(item, index) {
				this[index] = Object.keys(item).filter(key => itemsFilter.includes(key)).reduce((obj, key) => {
					obj[key] = item[key];
					return obj;
				}, {});

				if(item.modifiers !== undefined && item.modifiers.length > 0) item.modifiers.forEach(function(modifier, index) {
					this[index] = Object.keys(modifier).filter(key => modifiersFilter.includes(key)).reduce((obj, key) => {
						obj[key] = modifier[key];
						return obj;
					}, {});
				}, item.modifiers);
			}, items);
			
			orderFields = {
				terminalGroupId: formFields.terminalGroupId,
				phone: formFields.phone,
				items: items,
				customer: {
					name: formFields.name
				},
				payments: [
					{
						sum: this.cartTotal
					}
				]
			};

			/* const response = await this.$store.dispatch('sendOrder', {order: orderFields});

			if(!response) {
				this.throwToast('Возникла непредвиденная ошибка');
			} else {
				const checkResponse = await this.$store.dispatch('checkOrder', {params: {guid: response.order_guid}});
				if(!checkResponse) {
					this.throwToast('Возникла непредвиденная ошибка');
				} else {
					this.router.replace({path: '/result', query: {orderId: response.order_id ,shopId: formFields.terminalGroupId}});
				}
				// this.router.replace({path: '/result', query: {shopId: formFields.terminalGroupId}});

			} */

			this.throwToast('[DEV] Заказ успешно оформлен');
			console.log(JSON.stringify(orderFields));
			console.log(formFields);
		},
		// Phone confirmation
		async authorize(params) {
			const response = await this.$store.dispatch('login', {params: params});

			if(response) {
				this.throwToast(response.message === 'Sign-up' ? 'Регистрация выполнена успешно' : 'С возвращением!');
			} else {
				this.throwToast('Ошибка подтверждения номера');
			}
		},
		async showConfirmationPrompt(params, hasError = false) {
			const alert = await alertController.create({
				cssClass: 'auth-code-prompt',
				header: 'Подтверждение',
				subHeader: hasError ? 'Код неверен' : '',
				message: 'Введите код из SMS',
				backdropDismiss: false,
				inputs: [
					{
						name: 'name',
						type: 'text',
						cssClass: 'hidden',
						value: params.name
					},
					{
						name: 'phone',
						type: 'phone',
						cssClass: 'hidden',
						value: params.phone
					},
					{
						name: 'code',
						placeholder: '1234',
						type: 'number',
						attributes: {
							maxlength: 4,
							inputmode: 'numeric',
							enterkeyhint: 'done'
						}
					}
				],
				buttons: [
					{
						text: 'Отмена',
						role: 'cancel'
					},
					{
						text: 'Отправить',
						handler: (fields) => {
							this.sendConfirmationCode(fields);
						}
					}
				]
			});

			return alert.present();
		},
		async sendConfirmationCode(params) {
			const response = await this.$store.dispatch('sendConfirmationCode', {params: {phone: params.phone, code: params.code}});
			if(response) {
				this.authorize(params);
			} else {
				this.showConfirmationPrompt(params, true);
			}
		},
		async requestConfirmationCode() {
			const checkoutForm = document.getElementById('checkout-form');
			const formData = new FormData(checkoutForm);
			let formFields = {};

			for(var key of formData.keys()) {
				formFields[key] = formData.get(key).trim();
			}

			if(formFields['name'].length > 0 && formFields['phone'].length > 0) {
				const response = await this.$store.dispatch('requestConfirmationCode', {params: {phone: formFields.phone}});
				if(response) {
					this.showConfirmationPrompt(formFields);

					// Temporary thing
					this.scheduleNotification('Псс...', 'Ваш код подтверждения: '+response.code);
					console.log('Awating code:', response.code)
				} else {
					this.throwToast('Не удалось отправить код подтверждения');
				}
			} else {
				if(formFields['name'].length <= 0 && formFields['phone'].length <= 0) this.throwToast('Заполните поля "Имя" и "Телефон"');
				else if(formFields['name'].length <= 0) this.throwToast('Заполните поле "Имя"');
				else if(formFields['phone'].length <= 0) this.throwToast('Заполните поле "Телефон"');
			}
		},
		async scheduleNotification(title, body, secs = 5) {
			// eslint-disable-next-line no-unused-vars
			const notif = await LocalNotifications.schedule({
				notifications: [
					{
						title: title,
						body: body,
						id: 1,
						schedule: { at: new Date(Date.now() + 1000 * secs) },
						attachments: null,
						actionTypeId: '',
						extra: null
					}
				],
			});
		},
		async throwToast(message) {
			const toast = await toastController.create({
				message: message,
				position: 'bottom',
				duration: 3000
			});

			toast.present();
		},
		// Phone mask
		format(e) {
			const elem = e.target;
			const val = this.doFormat(elem.value, "***********");
			elem.value = val;
		},
		doFormat(x, pattern) {
			var strippedValue = x.replace(/[^0-9]/g, "");
			var chars = strippedValue.split('');
			var count = 0;

			var formatted = '';
			for (var i=0; i<pattern.length; i++) {
				const c = pattern[i];
				if (chars[count]) {
					if (/\*/.test(c)) {
						formatted += chars[count];
						count++;
					} else {
						formatted += c;
					}
				}
			}

			if(formatted.length > 0) {
				formatted = '7' + formatted.substring(1);
			}
			return formatted;
		}
	}
}
</script>
