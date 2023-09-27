<template>
  <base-layout page-title="Удаление аккаунта">
    <ion-grid>
      <ion-row>
        <ion-col>
          <form @submit="submitForm" id="delete-form">
            <p>Здесь вы долнжы подтвердить что хотите удалить данный аккуант.</p>
            <ion-item lines="none" class="checkout-page-input">
              <ion-label position="stacked">Телефон*</ion-label>
              <ion-input :disabled="isAuthorized && user && Object.keys(user).length !== 0 ? `true` : `false`" name="phone" placeholder="79998887766" autocomplete="tel" type="tel" required="true" :value="isAuthorized && user && Object.keys(user).length !== 0 ? user.phone : ``"></ion-input>
            </ion-item>
            <ion-button type="submit" expand="block">Отправить</ion-button>
          </form>
        </ion-col>
      </ion-row>
    </ion-grid>
  </base-layout>
</template>

<script>
import { IonGrid, IonRow, IonCol, IonButton, toastController, IonItem, IonLabel, IonInput, } from '@ionic/vue';

export default {
  components: {IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel, IonInput, },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isAuthorized() {
      return this.$store.getters.isAuthorized;
    },
  },
  methods: {
    async submitForm(e) {
      e.preventDefault();
        const response = await this.$store.dispatch('sendReview', {'message': 'Прошу удалить аккунт под номером '});

        if(response) {
          const toast = await toastController.create({
            message: 'Ваш запрос на удаление отправлен. Спасибо!',
            position: 'bottom',
            cssClass: 'toast-mb',
            mode: 'md',
            duration: 3000
          });
          await toast.present();
        } else {
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
