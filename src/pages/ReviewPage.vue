<template>
	<base-layout page-title="Оставить отзыв">
		<ion-grid>
			<ion-row>
				<ion-col>
					<form @submit="placeholder" id="review-form">
						<p>Оцените, пожалуйста, наш сервис и качество продуктов. Напишите сюда замечания, пожелания, так же мы будем рады предложениям.</p>
						<p>Можете упоминать сотрудников, их имена есть на бэйджах.</p>
						<div class="flex-center">
							<!-- Документация по компоненту vue-star-rating (в том числе стилизация) описана по ссылке ниже -->
							<!-- https://www.npmjs.com/package/vue-star-rating -->
							<star-rating @update:rating="setRating" :show-rating="false" :star-size="24" :padding="20"></star-rating>
							<input type="hidden" id="review-rating-input" name="rating" />
						</div>
						<ion-textarea name="message" id="message" required="true" placeholder="Текст отзыва*"></ion-textarea>
						<p class="text-center"><small>Отзыв будет отправлен анонимно руководству.</small></p>
						<ion-button type="submit" expand="block">Отправить</ion-button>
					</form>
				</ion-col>
			</ion-row>
		</ion-grid>
	</base-layout>
</template>

<script>
import { IonGrid, IonRow, IonCol, IonTextarea, IonButton, toastController } from '@ionic/vue';
import StarRating from 'vue-star-rating';

export default {
	components: { IonGrid, IonRow, IonCol, IonTextarea, IonButton, StarRating },
	methods: {
		async placeholder(e) {
			e.preventDefault();

			const formData = new FormData(e.target);
			let data = {};
			const textarea = document.getElementById('message');

			if(textarea.value.trim().length > 0) {
				textarea.value = '';

				for(let key of formData.keys()) {
					data[key] = formData.get(key);
				}

				// Send data

				for(let key of formData.keys()) {
					formData.set(key, '');
				}

				const toast = await toastController.create({
					message: 'Ваш отзыв отправлен. Спасибо!',
					position: 'bottom',
					duration: 3000
				});
				await toast.present();
			}
		},
		setRating(rating) {
			const ratingInput = document.getElementById('review-rating-input');
			ratingInput.value = rating;
		}
	}
}
</script>
