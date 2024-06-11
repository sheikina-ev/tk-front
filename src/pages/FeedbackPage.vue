<template>
  <base-layout page-title="Сообщить о технической проблеме">
    <ion-grid>
      <ion-row>
        <ion-col>
          <form @submit.prevent="submitForm" id="feedback-form">
            <p>Если вы нашли техническую проблему, сообщите нам подробности и мы примем меры. Спасибо!</p>
            <ion-textarea v-model="feedbackMessage" name="message" id="message" required placeholder="Описание проблемы*"></ion-textarea>
            <ion-button type="submit" expand="block">Отправить</ion-button>
          </form>
        </ion-col>
      </ion-row>
    </ion-grid>
  </base-layout>
</template>

<script>
import { IonGrid, IonRow, IonCol, IonTextarea, IonButton, toastController } from '@ionic/vue';
import BaseLayout from "@/components/base/BaseLayout.vue";

export default {
  components: { BaseLayout, IonGrid, IonRow, IonCol, IonTextarea, IonButton },
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
