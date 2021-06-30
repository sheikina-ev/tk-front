<template>
	<ion-page id="main">
		<ion-content class="background-image" no-scroll>
			<div class="auth-wrap center-content">
				<form @submit="requestConfirmationCode">
					<!-- <img class="icon" src="assets/img/auth-icon.svg" alt=""> -->
					<h1>Привет! &#9996;</h1>
					<p>Войдите, чтобы заказывать кофе заранее и пользоваться нашими акциями!</p>
					<ion-label class="auth-input-label" position="stacked">Введите свой номер телефона</ion-label>
					<ion-input color="dark" class="auth-input" name="phone" @ionChange="format" placeholder="+ 7 ( ___ ) ___- __- __" autocomplete="tel" type="tel" required="true" :value="user.phone"></ion-input>
					<ion-label class="auth-input-label" position="stacked">Как Вас зовут?</ion-label>
					<ion-input color="dark" class="auth-input" name="name" autocomplete="name" type="text" required="true" :value="user.name"></ion-input>
					<ion-button class="auth-btn btn-classic" expand="block" type="submit">Войти по номеру телефона</ion-button>
					<ion-button class="auth-subbtn" expand="block" fill="clear" router-direction="root" router-link="/shop">Пропустить и указать позже</ion-button>
				</form>
				<div class="bottom-link-wrap flex-center">
					<a @click="openModal('policy')" class="primary">Обработка персональных данных</a>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script >
import { IonPage, IonContent, IonLabel, IonInput, IonButton, modalController, toastController, alertController } from '@ionic/vue';
import Modal from '../components/misc/Modal.vue';
import { useRouter } from 'vue-router';
// import axios from 'axios';

export default {
	components: {
		IonPage,
		IonContent,
		IonLabel,
		IonInput,
		IonButton
	},
	setup() {
		const router = useRouter();
		return {
			router
		};
	},
	computed: {
		user() {
			return this.$store.getters.user;
		}
	},
	methods: {
		async throwToast(message) {
			const toast = await toastController.create({
				message: message,
				cssClass: 'toast-mb',
				mode: 'md',
				duration: 3000,
			});

			toast.present()
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
		async authorize(params) {
			const response = await this.$store.dispatch('login', {params: params});

			if(response) {
				this.throwToast(response.message === 'Sign-up' ? 'Регистрация выполнена успешно' : 'С возвращением!');

				this.router.replace('/shop');
			} else {
				this.throwToast('Ошибка авторизации');
			}
		},
		async showConfirmationPrompt(params, message = '') {
			const alert = await alertController.create({
				cssClass: 'auth-code-prompt',
				header: 'Подтверждение',
				subHeader: message,
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
				if(response.status === 'OK') {
					this.authorize(params);
				} else {
					this.showConfirmationPrompt(params, 'Код неверен');
				}
			} else {
				this.throwToast('Проверьте подключение к интернету или повторите попытку позже');
				this.showConfirmationPrompt(params);
			}
		},
		async requestConfirmationCode(e) {
			e.preventDefault();

			var params = {};
			const formData = new FormData(e.target);

			for(var key of formData.keys()) {
				params[key] = formData.get(key);
			}

			const response = await this.$store.dispatch('requestConfirmationCode', {params: {phone: params.phone}});
			if(response) {
				if(response.status === 'OK') {
					this.showConfirmationPrompt(params);
				} else {
					this.throwToast('Проверьте введённые данные');
				}
			} else {
				this.throwToast('Проверьте подключение к интернету или повторите попытку позже');
			}
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
