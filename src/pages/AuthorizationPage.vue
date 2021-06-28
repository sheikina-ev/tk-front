<template>
	<ion-page id="main">
		<ion-content class="background-image" no-scroll>
			<div class="auth-wrap center-content">
				<form @submit="requestConfirmationCode">
					<!-- <img class="icon" src="assets/img/auth-icon.svg" alt=""> -->
					<h1>Привет! &#9996;</h1>
					<p>Войдите, чтобы заказывать кофе заранее и пользоваться нашими акциями!</p>
					<ion-label class="auth-input-label" position="stacked">Введите свой номер телефона</ion-label>
					<ion-input color="dark" class="auth-input" name="phone" @ionChange="format" placeholder="+ 7 ( ___ ) ___- __- __" autocomplete="tel" type="tel" required="true"></ion-input>
					<ion-label class="auth-input-label" position="stacked">Как Вас зовут?</ion-label>
					<ion-input color="dark" class="auth-input" name="name" autocomplete="name" type="text" required="true"></ion-input>
					<ion-button class="auth-btn btn-classic" expand="block" type="submit">Войти по номеру телефона</ion-button>
					<ion-button class="auth-subbtn" expand="block" fill="clear" router-direction="root" router-link="/shop">Пропустить и указать позже</ion-button>
				</form>
			</div>
			<div class="bottom-link-wrap bottom-content flex-center">
				<a @click="openModal" class="primary">Обработка персональных данных</a>
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
		tmpPhone() {
			return this.$store.getters.tmpPhone;
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
		async openModal() {
			const modal = await modalController.create({
				component: Modal,
				cssClass: 'my-custom-modal',
				componentProps: {
					title: 'Обработка персональных данных',
					content: `
						1. Какую информацию мы собираем?
						Мы можем собирать, хранить и использовать следующие виды персональных данных:
						А. Информация о Вашем компьютере и посещениях сайта, его использовании (включая IP-адрес Вашего компьютера, географическое положение, тип и версия браузера, операционная система, источник информации, продолжительность посещения, просмотренные страницы и навигация сайта).
						Б. Информация, относящаяся к любого рода операциям между нами и Вами на сайте или по отношению к настоящему сайту, включая информацию о покупке какой-либо продукции или пользовании услугами сайта.
						В. Информация, указываемая при регистрации на сайте.
						Г. Информация, указанная при оформлении подписки на услуги, предоставляемые сайтом, уведомления по электронной почте и новостные рассылки.
						Д. Любая другая информация, которую Вы присылаете нам. Вы можете сохранить Правила пользования сайтом и ознакомиться с ними. Мы также храним все подробности Ваших заказов в нашем интернет-магазине. История заказов доступна в личной зоне, защищенной паролем.
						2. Файлы cookie
						Файл cookie состоит из информации, присылаемой веб-сервером браузеру, и которая хранится в браузере. Информация из браузера отсылается серверу каждый раз, когда браузер запрашивает страницу с сервера. Это позволяет веб-серверу идентифицировать и отслеживать данные браузера.
						Мы используем Google Analytics и Яндекс.Метрику для анализа посещаемости настоящего сайта. Google Analytics и Яндекс.Метрика формирует статистическую и другую информацию о сайте, используя файлы-cookie, которые хранятся в компьютерах пользователей. Эта информация используется для составления отчетов об использовании сайта. Полученные данные хранятся в Google’e и Яндексе. Политику конфиденциальности Google’a можно посмотреть на http://www.google.com/intl/ru/analytics/tos.html. Политику конфиденциальности Яндекса можно посмотреть на http://legal.yandex.ru/confidential/.
						3. Использование персональных данных пользователей
						Персональная информация, полученная через сайт, может быть использована только в целях, обозначенных в настоящей политике конфиденциальности или в соответствующих разделах сайта.
						Администрация сайта может использовать персональные данные, чтобы:
						А. Администрировать работу сайта.
						Б. Улучшить работу браузера пользователя посредством персонализации сайта.
						В. Позволить пользователю пользоваться услугами сайта.
						Г. Отправлять пользователю купленные на сайте товары и оказывать платные услуги сайта.
						Д. Отправлять пользователю договоры, акты, счета-фактуры и другие операции, связанные с извещением пользователя, а также осуществлять прием платежей от пользователя.
						Е. Отправлять пользователю уведомления по электронной почте по специальному запросу.
						Ж. Отправлять пользователю рекламных, маркетинговых материалов, а также сервисных информационных сообщений путем e-mail-, sms-рассылки, с правом передачи данных Пользователя третьим лицам.
						З. Сообщать третьим лицам статистическую информацию о пользователях сайта – однако, исключено разглашение информации, позволяющей идентифицировать конкретного пользователя.
						И. Иметь дело с расследованиями и жалобами со стороны или в отношении пользователя, только если затрагиваются интересы сайта. В соответствии со ст. 9 Федерального закона "О персональных данных" № 152-ФЗ от 27.07.2006, Вы даете согласие компании ООО «Р2А» на обработку (включая сбор, систематизацию, накопление, хранение, уточнение (обновление, изменение), распространение (трансграничную передачу, передачу в целях исполнения договоров купли-продажи товаров), обезличивание, блокирование, уничтожение) своих персональных данных, сообщаемых в целях регистрации на сайте интернет-магазина, а также покупки и получения товаров, представленных в настоящем интернет-магазине.
						Администрация сайта гарантирует пользователю неразглашение его персональных данных третьим лицам в целях прямого маркетинга без его письменного разрешения.
					`
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
