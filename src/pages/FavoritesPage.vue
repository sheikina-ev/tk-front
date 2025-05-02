<template>
  <base-layout page-title="Избранные товары">
    <div class="favPage mx-auto px-4 sm:px-6 lg:px-8 mb-28">
      <h1 class="text-3xl font-bold text-gray-900 mt-10 mb-6 text-center">Избранные товары</h1>

      <div v-if="favorites.length === 0" class="text-center mt-52 text-lg">
        У вас нет избранных товаров.
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
            v-for="item in favorites"
            :key="item.id"
            @click="openModal(item)"
            class="cursor-pointer border-2 border-custom-color1 rounded-lg p-4 shadow-lg transition-transform transform hover:-translate-y-1 flex flex-col items-center"
        >
          <img
              :src="item.image"
              :alt="item.product_name"
              class="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 class="text-custom-color1 font-semibold text-lg mb-2">{{ item.product_name }}</h3>
          <p class="text-custom-color1 text-base mb-4">{{ item.price }} ₽</p>

          <ion-button
              fill="outline"
              color="danger"
              expand="block"
              @click.stop="removeFavorite(item.id)"
              class="rounded-lg py-2 px-4"
          >
            Удалить
          </ion-button>
        </div>
      </div>
    </div>

    <AppFooter />
  </base-layout>
</template>

<script>
import { modalController, IonButton } from '@ionic/vue';
import BaseLayout from "@/components/base/BaseLayout.vue";
import AppFooter from "@/components/base/AppFooter.vue";
import CoffeeDetail from "@/pages/CoffeeDetail.vue";

export default {
  components: {
    AppFooter,
    BaseLayout,
    IonButton,
  },
  computed: {
    favorites() {
      return this.$store.getters.favorites || [];
    },
  },
  methods: {
    removeFavorite(productId) {
      this.$store.commit('removeFavorite', productId);
    },
    async openModal(product) {
      const modal = await modalController.create({
        component: CoffeeDetail,
        componentProps: {
          coffeeItem: product
        },
        swipeToClose: true,
        presentingElement: document.querySelector('ion-router-outlet')
      });

      await modal.present();
    }
  }
};
</script>
