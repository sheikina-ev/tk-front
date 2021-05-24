<template>
	<base-layout page-title="Сообщить о технической проблеме">
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
	</base-layout>
</template>

<script>
import { IonGrid, IonRow, IonCol, IonTextarea, IonButton, toastController } from '@ionic/vue';

export default {
	components: {IonGrid, IonRow, IonCol, IonTextarea, IonButton},
	methods: {
		async submitForm(e) {
			e.preventDefault();
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
