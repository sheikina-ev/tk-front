<template>
  <base-layout page-title="Корзина">
    <div class="cart-page ml-80">
      <h1 class="cart-header mt-10" style="font-weight: 700; font-size: 18px">Корзина</h1>
      <div v-if="cart.length > 0" class="cart-container">
        <div v-for="cartItem in cart" :key="cartItem.line_id" class="cart-item relative flex items-start mb-8 w-full top-14 ">
          <img :src="cartItem.image" alt="item image" class="item-image w-48 h-48 object-cover rounded-lg mr-4"/>

          <div class="item-details">
            <p class="item-title text-lg font-semibold mb-1">{{ cartItem.name }}</p>
            <p class="item-subtitle text-sm text-gray-600 mb-2" v-if="cartItem.addons">{{ cartItem.addons }}</p>
            <p class="item-additional text-xs text-gray-600 mb-1">Добавки: какие-то добавки к товару</p>
            <p class="text-lg font-semibold mt-28">{{ cartItem.price }} руб</p>
          </div>
          <div class="item-price flex flex-col ml-56">
            <div class="item-remove cursor-pointer" @click="removeItem(cartItem)">
              <ion-icon :icon="closeOutline"></ion-icon>
            </div>
            <div class="item-quantity flex mt-32 -ml-20">
              <ion-icon :icon="removeCircleOutline" class="text-gray-600 text-xl cursor-pointer mx-2" @click="decrement(cartItem)"></ion-icon>
              <span class="text-xs text-gray-600 mr-2">{{ cartItem.amount }}</span>
              <ion-icon :icon="addCircleOutline" class="text-gray-600 text-xl cursor-pointer mx-2" @click="increment(cartItem)"></ion-icon>
            </div>
          </div>

        </div>
        <div class="order-summary   items-end w-full  -ml-80">
          <p class="font-semibold text-lg mb-2">Сумма заказа {{ cartTotal }} руб</p>
          <ion-button expand="block" router-link="/checkout" class="text-black mt-8" style="top: 327px; width: 297px; height: 35px; left: 1309px; border: 1px solid; border-radius: 20px; gap: 10px; overflow: hidden;">
            Оформить заказ
          </ion-button>
        </div>
      </div>
      <div class="center-content" v-else>
        <h2 class="text-center">Корзина пуста</h2>
      </div>
    </div>
    <AppFooter></AppFooter>
  </base-layout>
</template>

<script>
import { IonButton, IonIcon } from '@ionic/vue';
import { cartOutline, closeOutline, removeCircleOutline, addCircleOutline } from 'ionicons/icons';
import BaseLayout from "@/components/base/BaseLayout.vue";
import AppFooter from "@/components/base/AppFooter.vue";

export default {
  components: {
    AppFooter,
    BaseLayout,
    IonButton,
    IonIcon
  },
  setup() {
    return {
      cartOutline,
      closeOutline,
      removeCircleOutline,
      addCircleOutline
    }
  },
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    }
  },
  methods: {
    increment(cartItem) {
      this.$store.commit('changeAmount', { line_id: cartItem.line_id, action: 'increase' });
      this.$store.commit('calculateCartTotal');
    },
    decrement(cartItem) {
      this.$store.commit('changeAmount', { line_id: cartItem.line_id, action: 'decrease' });
      this.$store.commit('calculateCartTotal');
    },
    removeItem(cartItem) {
      this.$store.commit('removeCartItem', { line_id: cartItem.line_id });
      this.$store.commit('calculateCartTotal');
    }
  }
};
</script>

<style scoped>

.item-remove {
  color: #888;
  font-size: 24px;
}
.cart-page {
  min-height: calc(100vh - 122px); /* Высота видимой части окна минус высота футера */
}
AppFooter{
  position: relative;
  bottom: 0;
  width: 100%;
  height: 100px; /* Высота вашего футера */
}
</style>
