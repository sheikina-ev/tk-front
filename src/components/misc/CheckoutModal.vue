<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-back-button defaultHref="/" text="" @click="dismissModal" :icon="chevronBack"></ion-back-button>
      </ion-buttons>
      <ion-title>{{title}}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <iframe id="checkout-iframe" :src="src" frameborder="0"></iframe>
  </ion-content>
</template>

<script>
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, modalController } from "@ionic/vue";
import { chevronBack } from "ionicons/icons";

export default {
  components: { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent },
  props: ['title', 'src'],
  setup() {
    return {
      chevronBack
    }
  },
  mounted() {
    window.addEventListener('message', (e) => {
      const data = e.data;

      if(data.isPaymentSuccessful !== undefined) {
        modalController.dismiss({isPaymentSuccessful: data.isPaymentSuccessful});
      }
    });
  },
  methods: {
    dismissModal(e) {
      e.preventDefault();

      modalController.dismiss({isPaymentSuccessful: false});
    }
  }
}
</script>