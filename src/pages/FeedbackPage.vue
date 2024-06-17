<template>
  <base-layout page-title="Сообщить о технической проблеме">
    <ion-grid class="px-20 lg:px-80">
      <ion-row class="flex justify-center">
        <ion-col size-md="8">
          <form @submit.prevent="submitForm" id="feedback-form" class="bg-white p-8 mt-40 rounded mb-60 shadow-lg mb-15 border border-gray-300">
            <p class="text-lg mb-4">Если вы нашли техническую проблему, сообщите нам подробности и мы примем меры. Спасибо!</p>
            <ion-textarea v-model="feedbackMessage" name="message" id="message" required placeholder="Описание проблемы*" class="mb-6" style="border: 1px solid #CBD5E0; border-radius: 0.375rem;"></ion-textarea>
            <div class="flex justify-center">
              <button type="submit" class="w-48 h-9 rounded-full bg-custom-color text-sm font-medium border border-black outline-none mt-4" style="border: 1px solid black">
                Отправить
              </button>
            </div>
          </form>
        </ion-col>
      </ion-row>
    </ion-grid>
    <AppFooter/>
  </base-layout>
</template>

<script>
import { IonGrid, IonRow, IonCol, IonTextarea, toastController } from '@ionic/vue';
import BaseLayout from "@/components/base/BaseLayout.vue";
import AppFooter from "@/components/base/AppFooter.vue";

export default {
  components: { AppFooter, BaseLayout, IonGrid, IonRow, IonCol, IonTextarea },
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
