<template>
	<ion-header class="modal-feedback">
		<ion-title>Сообщить о технисеской проблеме</ion-title>
		<span @click="dismissModal" class="modal-close"><ion-icon :icon="chevronBackOutline "></ion-icon></span>
	</ion-header>
	<ion-grid>
		<ion-row>
			<ion-col>
				<form @submit="submitForm" id="feedback-form">
					<p>Если вы нашли техническую проблему, сообщите нам подробности и мы примем меры. Спасибо!</p>
					<ion-textarea id="message" required="true" placeholder="Описание проблемы*"></ion-textarea>
					<ion-button type="submit" expand="block">Отправить</ion-button>
				</form>
			</ion-col>
		</ion-row>
	</ion-grid>
</template>

<script>
import { IonGrid, IonRow, IonCol, IonTextarea, IonIcon, IonButton, toastController } from '@ionic/vue';
import { chevronBackOutline } from 'ionicons/icons';

export default {
	components: {IonGrid, IonRow, IonIcon, IonCol, IonTextarea, IonButton},
	setup() {
		return {
			chevronBackOutline 
		}
	},
	methods: {
		async submitForm(e) {
			e.preventDefault();
			// const form = document.getElementById('feedback-form');
			const textarea = document.getElementById('message');

			if(textarea.value.trim().length > 0) {
				textarea.value = '';

				const toast = await toastController.create({
					message: 'Ваше сообщение отправлено. Спасибо!',
					position: 'bottom',
					duration: 3000
				});
				await toast.present();
			}
		}
	}
}
</script>
