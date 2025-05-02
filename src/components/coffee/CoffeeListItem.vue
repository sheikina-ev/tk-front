<template>
  <ion-col size="6">
    <div class="coffee-container" @click="openModal">
      <ion-card class="coffee-card">
        <div class="skeleton-wrap">
          <ion-img :src="coffeeItem.image"></ion-img>
        </div>
      </ion-card>
      <div class="coffee-item-info mt-2">
        <span class="block font-bold text-lg">{{ coffeeItem.product_name }}</span>
        <p v-if="coffeeItem.price" class="text-center text-black">от {{ coffeeItem.price }}₽</p>
      </div>
    </div>
  </ion-col>
</template>

<script>
import { IonCol, IonCard, IonImg, modalController } from '@ionic/vue';
import CoffeeDetail from "@/pages/CoffeeDetail.vue";

export default {
  props: ['coffeeItem'],
  components: {
    IonCol,
    IonCard,
    IonImg
  },
  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: CoffeeDetail,
        componentProps: {
          coffeeItem: this.coffeeItem
        },
        cssClass: 'custom-modal'
      });
      await modal.present();
    }
  }
};
</script>



<style scoped>
.coffee-container {
  @apply transition-transform duration-300 ease-in-out cursor-pointer;
}

.coffee-container:hover {
  @apply transform scale-105;
}

.skeleton-wrap {
  @apply relative w-full;
  padding-top: 100%;
}

.skeleton-wrap ion-img {
  @apply absolute top-0 left-0 w-full h-full object-cover;
}
</style>
