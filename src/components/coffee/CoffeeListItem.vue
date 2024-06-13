<template>
  <ion-col skeleton size="6">
    <ion-card class="coffee-card modal" @click="openModal" :router-link="`/coffee/${coffeeItem.id}`" :class="{ 'modal-open': showModal }">
      <div class="skeleton-wrap">
        <ion-img :src="coffeeItem.image"></ion-img>
      </div>
    </ion-card>
    <div class="coffee-item-info">
      <span class="ion-text-center coffee-item-name">{{ coffeeItem.product_name }}</span>
      <p v-if="coffeeItem.price" class="ion-text-center coffee-item-price">от {{ coffeeItem.price }}₽</p>
    </div>
  </ion-col>
</template>

<script>
import { IonCol, IonCard, IonImg, modalController } from '@ionic/vue';
import Modal from '../misc/Modal.vue';

export default {
  props: ['coffeeItem'],
  components: {
    IonCol,
    IonCard,
    IonImg
  },
  methods: {
    async openModal() {
      console.log("Opening modal with coffeeItem:", this.coffeeItem);
      const modal = await modalController.create({
        component: Modal,
        componentProps: {
          coffeeItem: this.coffeeItem
        }
      });
      await modal.present();
      // Добавление класса для оверлея модального окна
      document.body.classList.add('modal-open');

      // Обработка закрытия модального окна
      modal.onDidDismiss().then(() => {
        document.body.classList.remove('modal-open');
      });
    }
  }
};
</script>

<style scoped>
.coffee-card {
  cursor: pointer;
}

.modal-open::after {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.49); /* Полупрозрачный черный цвет фона */
  z-index: 999; /* Положение над всеми элементами, кроме модального окна */
}
</style>
