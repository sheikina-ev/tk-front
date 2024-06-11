<template>
  <ion-col size="6">
    <ion-card class="coffee-card" @click="openModal">
      <div class="skeleton-wrap">
        <ion-img :src="coffeeItem.image"></ion-img>
      </div>
    </ion-card>
    <div class="coffee-item-info">
      <span class="ion-text-start coffee-item-name" style="color: black; font-weight: 700;">{{ coffeeItem.product_name }}</span>
      <p v-if="coffeeItem.price" class="ion-text-start coffee-item-price" style="color: #000000; font-weight: 500;">
        от {{ coffeeItem.price }} ₽
      </p>
    </div>
  </ion-col>
</template>

<script>
import { IonCol, IonCard, IonImg, modalController } from '@ionic/vue';
import Modal from '../misc/Modal.vue'; // Убедитесь, что путь правильный

export default {
  props: ['coffeeItem'],
  components: {
    IonCol,
    IonCard,
    IonImg
  },
  methods: {
    async openModal() {
      console.log("Opening modal with coffeeItem:", this.coffeeItem); // Проверка данных перед открытием модального окна
      const modal = await modalController.create({
        component: Modal,
        componentProps: {
          coffeeItem: this.coffeeItem
        }
      });
      await modal.present();
    }
  }

}
</script>
