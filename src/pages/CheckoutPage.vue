<template>
	<base-layout page-title="Оформить заказ">
		<form v-if="cart.length > 0" id="checkout-form" @submit="submitOrder">
			<ion-item lines="none" class="checkout-page-input">
				<ion-label position="stacked">Имя*</ion-label>
				<ion-input name="name" autocomplete="name" required="true" :value="user && Object.keys(user).length !== 0 ? user.name : ``"></ion-input>
			</ion-item>
			<ion-item lines="none" class="checkout-page-input">
				<ion-label position="stacked">Телефон*</ion-label>
				<ion-input :disabled="isAuthorized && user && Object.keys(user).length !== 0 ? `true` : `false`" @ionChange="format" name="phone" placeholder="79998887766" autocomplete="tel" type="tel" required="true" :value="isAuthorized && user && Object.keys(user).length !== 0 ? user.phone : ``"></ion-input>
				<input v-if="isAuthorized && user && Object.keys(user).length !== 0" type="hidden" name="phone" :value="user.phone" />
				<ion-button fill="clear" v-if="isAuthorized" @click="changePhoneNumber">Изменить номер</ion-button>
				<div class="flex-center full-width">
					<ion-button v-if="!isAuthorized" color="secondary" @click="requestConfirmationCode">Подтвердить номер</ion-button>
				</div>
			</ion-item>
			<ion-item lines="none" class="checkout-page-select">
				<ion-label position="stacked">Выбранный адрес</ion-label>
				<ion-input disabled="true" :value="activeShop.store_name"></ion-input>
				<input type="hidden" name="terminalGroupId" :value="activeShop.guid" />
				<!-- <ion-select name="terminalGroupId" :value="activeShop ? activeShop.guid : ``" interface="popover" required="true">
					<ion-select-option v-for="shop in shops" :key="shop.guid" :value="shop.guid">{{ shop.store_name }}</ion-select-option>
				</ion-select> -->
			</ion-item>
			<ion-item lines="none" class="checkout-page-input">
				<ion-label v-if="bonus !== '' && bonus !== false" class="checkout-page-total" position="stacked"><b>Мои баллы: {{ bonus }}</b></ion-label>
				<ion-label v-else class="checkout-page-total" position="stacked"><b>Мои баллы: Необходимо подтвердить номер</b></ion-label>
				<ion-label position="stacked">Списать баллов</ion-label>
				<ion-input name="bonus" type="number" @ionChange="validateBonusField" :disabled="bonus ? false : true" v-model="bonusPoints"></ion-input>
			</ion-item>
			<div class="order-total-wrap">
				<b>Итого:</b>
				<b>{{ cartTotal ? cartTotal+' руб.' : '0 руб.' }}</b>
			</div>
			<div v-if="bonusPoints > 0" class="order-total-wrap">
				<b>К оплате:</b>
				<b>{{ cartTotal - bonusPoints }} руб.</b>
			</div>
			<ion-radio-group>
				<span class="order-payment-label">Оплата онлайн "Сбербанк"</span>
				<ion-item lines="none">
					<ion-label class="img-apple"></ion-label>
					<!-- <ion-radio name="payment" value="apple"></ion-radio> -->
				</ion-item>
				<ion-item lines="none">
					<ion-label class="img-visa"></ion-label>
					<!-- <ion-radio name="payment" value="card"></ion-radio> -->
				</ion-item>
				<ion-item lines="none">
					<ion-label class="img-google"></ion-label>
					<!-- <ion-radio name="payment" value="google"></ion-radio> -->
				</ion-item>
			</ion-radio-group>
			<ion-button expand="block btn-classic checkout-page-btn" type="submit" :disabled="isAuthorized ? `false` : `true`">Оплатить</ion-button>
			<div class="bottom-link-wrap flex-center">
				<a @click="openModal('policy')" class="primary dark">Условия использования и персональные данные</a>
			</div>
		</form>
		<div class="center-content" v-else>
			<h2 class="text-center">Корзина пуста</h2>
		</div>
	</base-layout>
</template>

<script>
import { IonItem, IonLabel, IonInput, IonRadioGroup, IonButton, alertController, toastController, modalController } from '@ionic/vue';
import Modal from '../components/misc/Modal.vue';
import { useRouter } from 'vue-router';
import { InAppBrowser } from '@ionic-native/in-app-browser';

export default {
	components: {
		IonItem,
		IonLabel,
		IonInput,
		IonRadioGroup,
		IonButton
	},
	data() {
		return {
			bonusPoints: ''
		}
	},
	setup() {
		const router = useRouter();
		return {
			router
		};
	},
	computed: {
		activeShop() {
			const activeShop = this.$store.getters.activeShop;
			const shops = this.$store.getters.shops;
			if(!activeShop || shops.length <= 0) this.$store.dispatch('getStores', {setActiveShop: true});
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
		},
		bonus() {
			let bonus = this.$store.getters.bonus;
			
			if(this.isAuthorized && bonus !== '') return bonus;
			else if(this.isAuthorized && !bonus !== '') {
				this.$store.dispatch('getBonuses', this.user.phone);
				return bonus;
			}

			return false;
		}
	},
	unmounted() {
		// this.$store.commit('clearState', 'bonus');
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
							this.bonusPoints = 0;
						}
					}
				]
			});

			return alert.present();
		},
		async submitOrder(e, isTest = false) {
			e.preventDefault();
			let items = JSON.parse(JSON.stringify(this.cart));
			let orderFields = {};
			let formFields = {};
			const formData = new FormData(e.target);
			const iab = InAppBrowser;

			for(var key of formData.keys()) {
				formFields[key] = formData.get(key);
			}

			// Filter item fields
			let itemsFilter = ['type', 'productId', 'amount', 'modifiers', 'name', 'price'];
			let modifiersFilter = ['productId', 'amount', 'productGroupId', 'name'];
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
				cash: this.cartTotal - (parseFloat(formFields.bonus) || 0),
				bonus: parseFloat(formFields.bonus) || 0
			};

			if(isTest) {
				console.log(this.cartTotal);
				console.log(formFields.bonus);
				this.throwToast('[DEV] Заказ успешно оформлен');
				console.log(JSON.stringify(orderFields));
				console.log(formFields);
				return
			}

			console.log(orderFields);
			const response = await this.$store.dispatch('sendOrder', {order: orderFields});
			var orderId = 0;

			if(!response) {
				this.throwToast('Возникла непредвиденная ошибка');
			} else if(response.status == "Error") {
				this.throwToast('Ошибка: ' + response.message);
			} else {
				orderId = response.data.orderId;
				try {
					const browser = await iab.create(response.data.link, '_blank', {location: 'no', zoom: 'no', hidenavigationbuttons: 'yes'});
					// eslint-disable-next-line no-unused-vars
					browser.on('loadstop').subscribe(event => {
						var loop = window.setInterval(function(){
							browser.executeScript({
									code: "window.shouldClose"
								},
								function(values){
									if(values[0]){
										browser.close();
										window.clearInterval(loop);
									}
								}
							);
						},100);
					})
				} catch(e) {
					console.error('Yup, that\'s a browser all right');
				}
				this.router.replace({path: '/result', query: {shopId: formFields.terminalGroupId, orderId: orderId}});
			}
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
				} else {
					this.throwToast('Не удалось отправить код подтверждения');
				}
			} else {
				if(formFields['name'].length <= 0 && formFields['phone'].length <= 0) this.throwToast('Заполните поля "Имя" и "Телефон"');
				else if(formFields['name'].length <= 0) this.throwToast('Заполните поле "Имя"');
				else if(formFields['phone'].length <= 0) this.throwToast('Заполните поле "Телефон"');
			}
		},
		async throwToast(message) {
			const toast = await toastController.create({
				message: message,
				position: 'bottom',
				cssClass: 'toast-mb',
				mode: 'md',
				duration: 3000
			});

			toast.present();
		},
		// Bonus validation
		validateBonusField(e) {
			const bonus = parseInt(this.bonus);
			const sum = (this.cartTotal - 1); // Preventing customer from paying full sum with bonus points
			if(e.target.value > bonus || e.target.value > sum) {
				if(e.target.value > sum) {
					e.target.value = sum;
				} else if(e.target.value > bonus) {
					e.target.value = bonus;
				}
				// e.target.value = (e.target.value > sum ? sum : (e.target.value > bonus ? bonus : e.target.value));
			}
		},
		async openModal(code) {
			const modal = await modalController.create({
				component: Modal,
				cssClass: 'my-custom-modal',
				componentProps: {
					code: code
				}
			});
			
			return modal.present();
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
