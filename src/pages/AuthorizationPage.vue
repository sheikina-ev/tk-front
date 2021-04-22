<template>
	<ion-page>
		<ion-content class="background-image" no-scroll>
			<div class="auth-wrap center-content">
				<form>
					<img class="icon" src="assets/img/auth-icon.svg" alt="">
					<h1>Привет! &#9996;</h1>
					<p>Войдите, чтобы заказывать кофе заранее и пользоваться нашими акциями!</p>
					<ion-label class="auth-input-label" position="stacked">Введите свой номер телефона</ion-label>
					<ion-input color="dark" class="auth-input" name="login" placeholder="+ 7 ( ___ ) ___- __- __" autocomplete="tel" type="tel"></ion-input>
					<ion-label class="auth-input-label" position="stacked">Как Вас зовут?</ion-label>
					<ion-input color="dark" class="auth-input" name="name" autocomplete="name" type="text"></ion-input>
					<ion-button expand="block" @click="throwMessage('Авторизация временно недоступна')">Let me in!</ion-button>
					<ion-button expand="block" fill="clear" @click="authorize" router-link="/coffee">Пропустить и указать позже</ion-button>
				</form>
				<!-- For dev purposes -->
			</div>
			<div class="bottom-content flex-center">
				<a @click="openModal" class="primary">Обработка персональных данных</a>
			</div>
		</ion-content>
	</ion-page>
</template>

<script>
import { IonPage, IonContent, IonLabel, IonInput, IonButton, modalController, menuController, toastController } from '@ionic/vue';
import Modal from '../components/misc/Modal.vue';

export default {
	components: {
		IonPage,
		IonContent,
		IonLabel,
		IonInput,
		IonButton
	},
	setup() {
		menuController.enable(false, 'main');
	},
	methods: {
		async openModal() {
			const modal = await modalController.create({
				component: Modal,
				cssClass: 'my-custom-modal',
				componentProps: {
					title: 'Обработка персональных данных',
					content: `What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.`
				}
			});
			return modal.present();
		},
		// WIP
		async throwMessage(message) {
			const toast = await toastController.create({
				message: message,
				position: 'bottom',
				duration: 3000
			});
			await toast.present();
		},
		authorize() {
			this.$store.commit('authorize');
		}
	}
}
</script>
