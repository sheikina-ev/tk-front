<template>
  <base-layout page-title="Сообщить о технической проблеме">
    <ion-grid class="px-20 lg:px-80">
      <ion-row class="flex justify-center">
        <ion-col size-md="8">
          <form @submit.prevent="submitForm" id="feedback-form" class="bg-white p-8 rounded shadow-md mt-40 mb-60">
            <p class="text-lg mb-4">Если вы нашли техническую проблему, сообщите нам подробности и мы примем меры. Спасибо!</p>
            <ion-textarea v-model="feedbackMessage" name="message" id="message" required placeholder="Описание проблемы*" class="w-full mb-6"></ion-textarea>
            <ion-button type="submit" expand="block" class="w-full">Отправить</ion-button>
          </form>
        </ion-col>
      </ion-row>
    </ion-grid>
    <AppFooter/>
  </base-layout>
</template>

<script>
import { IonGrid, IonRow, IonCol, IonTextarea, IonButton, toastController } from '@ionic/vue';
import BaseLayout from "@/components/base/BaseLayout.vue";
import AppFooter from "@/components/base/AppFooter.vue";

export default {
  components: {AppFooter, BaseLayout, IonGrid, IonRow, IonCol, IonTextarea, IonButton },
  data() {
    return {
      feedbackMessage: ''
    };
  },
  methods: {
    async submitForm() {
      if (this.feedbackMessage.trim().length === 0) {
        return; // Не отправляем форму, если поле сообщения пустое
      }

      try {
        const response = await this.$store.dispatch('sendFeedback', { message: this.feedbackMessage });

        if (response) {
          this.feedbackMessage = '';

          const toast = await toastController.create({
            message: 'Ваше сообщение отправлено. Спасибо!',
            position: 'bottom',
            cssClass: 'toast-mb',
            mode: 'md',
            duration: 3000
          });
          await toast.present();
        }
      } catch (error) {
        console.error('Ошибка при отправке обратной связи:', error);
        const toast = await toastController.create({
          message: 'Непредвиденная ошибка, повторите попытку позже',
          position: 'bottom',
          cssClass: 'toast-mb',
          mode: 'md',
          duration: 3000
        });
        await toast.present();
      }
    }
  }
}
</script>


