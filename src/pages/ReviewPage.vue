<template>
  <base-layout page-title="Оставить отзыв">
    <ion-grid class="px-20 lg:px-80">
      <ion-row class="flex justify-center">
        <ion-col size-md="8">
          <form @submit.prevent="submitReview" id="review-form" class="bg-white p-8 rounded mt-40 shadow-md mb-60">
            <p class="text-lg mb-4">Оцените, пожалуйста, наш сервис и качество продуктов. Напишите сюда замечания, пожелания, так же мы будем рады предложениям.</p>
            <p class="text-lg mb-4">Можете упоминать сотрудников, их имена есть на бэйджах.</p>
            <div class="flex justify-center mb-6">
              <star-rating @update:rating="setRating" :show-rating="false" :star-size="24" :padding="20"></star-rating>
              <input type="hidden" v-model="reviewData.rating" />
            </div>
            <ion-textarea v-model="reviewData.message" name="message" id="message" required placeholder="Текст отзыва*" class="w-full mb-6"></ion-textarea>
            <ion-button type="submit" expand="block" class="w-full ">Отправить</ion-button>
          </form>
        </ion-col>
      </ion-row>
    </ion-grid>
    <AppFooter/>
  </base-layout>
</template>

<script>
import { IonGrid, IonRow, IonCol, IonTextarea, IonButton, toastController } from '@ionic/vue';
import StarRating from 'vue-star-rating';
import BaseLayout from "@/components/base/BaseLayout.vue";
import AppFooter from "@/components/base/AppFooter.vue";

export default {
  components: {AppFooter, BaseLayout, IonGrid, IonRow, IonCol, IonTextarea, IonButton, StarRating },
  data() {
    return {
      reviewData: {
        rating: 0,
        message: ''
      }
    };
  },
  methods: {
    async submitReview() {
      if (this.reviewData.message.trim().length === 0) {
        return; // Не отправляем отзыв, если поле сообщения пустое
      }

      try {
        const response = await this.$store.dispatch('sendReview', this.reviewData);

        if (response) {
          // Очищаем поля формы после успешной отправки отзыва
          this.reviewData.message = '';
          this.reviewData.rating = 0;

          await this.presentToast('Ваш отзыв отправлен. Спасибо!');
        } else {
          await this.presentToast('Непредвиденная ошибка, повторите попытку позже');
        }
      } catch (error) {
        console.error('Ошибка при отправке отзыва:', error);
        await this.presentToast('Произошла ошибка. Пожалуйста, повторите попытку позже');
      }
    },
    setRating(rating) {
      this.reviewData.rating = rating;
    },
    async presentToast(message) {
      const toast = await toastController.create({
        message: message,
        position: 'bottom',
        cssClass: 'toast-mb',
        mode: 'md',
        duration: 3000
      });
      await toast.present();
    }
  }
}
</script>

