<template>
  <base-layout page-title="Корзина">
    <div class="cart-page ml-80">
      <h1 class="cart-header mt-10 mb-16" style="font-weight: 700; font-size: 18px">Корзина</h1>
      <div v-if="cart.length > 0" class="cart-container">
        <div
            v-for="cartItem in cart"
            :key="cartItem.line_id"
            class="cart-item relative flex items-start mb-8 w-full"
            style="display: flex;"
        >
        <img :src="cartItem.image" alt="item image" class="item-image w-48 h-48 object-cover mr-4" />

        <div class="item-details" style="flex: 1;"> <!-- Добавляем стиль flex: 1 для блока с деталями товара -->
          <h2 class="item-title text-lg font-semibold mb-1" style="text-transform: uppercase;">{{ cartItem.name }}</h2>
          <!-- Показываем добавки, если они есть -->
          <div class="cart-item-modifiers-wrap" v-if="cartItem.modifiers && cartItem.modifiers.length > 0">
            <h1 class="mt-4 mb-4" style="font-size: 18px; font-weight: 700">Добавки</h1>
            <span
                v-for="(modifier, index) in cartItem.modifiers"
                :key="getModifierKey(cartItem, modifier, index)"
            >
                <span v-if="modifier.name">{{ modifier.name }}{{ index !== cartItem.modifiers.length - 1 ? ', ' : '' }}</span>
              </span>
          </div>
          <!-- Показываем текст о добавках, если их нет -->
          <div v-else>
            <h1 class="mt-4 mb-4" style="font-size: 18px; font-weight: 700">Добавки</h1>
            <p class="text-xs">Без добавок</p>
          </div>
          <p class="text-lg font-semibold mt-16">{{ cartItem.price }} руб</p>
        </div>

        <div class="item-price flex flex-col ml-auto"> <!-- Добавляем стиль ml-auto для выравнивания цены справа -->
          <div class="item-remove text-black cursor-pointer absolute right-0 top-0" @click="removeItem(cartItem)">
            <ion-icon :icon="closeOutline"></ion-icon>
          </div>
          <div class="item-quantity flex mt-32 -ml-20">
            <ion-icon :icon="removeCircleOutline" class="text-black text-xl cursor-pointer  mt-16" @click="decrement(cartItem)"></ion-icon>
            <span class="text-xs text-black mt-1">{{ cartItem.amount }}</span>
            <ion-icon :icon="addCircleOutline" class="text-black text-xl cursor-pointer  mt-16" @click="increment(cartItem)"></ion-icon>
          </div>
        </div>
      </div>
      <!-- Блок для суммы заказа и кнопки оформить -->
      <div class="order-summary" style="position: absolute; left: 1309px; top: 123px;">
        <p class="font-semibold text-lg" style="font-weight: 500;">Сумма заказа<span style="font-weight: 700; margin-left: 92px"> {{ cartTotal }} руб</span> </p>
        <button
            style="width: 297px;height: 35px;border-radius: 20px;border: 1px solid black;background-color: #F9D9B8;cursor: pointer;outline: none;margin-top: 62px;"
            @click="goToCheckout"
        >
          Оформить заказ
        </button>
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
import {IonIcon } from '@ionic/vue';
import { cartOutline, closeOutline, removeCircleOutline, addCircleOutline } from 'ionicons/icons';
import BaseLayout from "@/components/base/BaseLayout.vue";
import AppFooter from "@/components/base/AppFooter.vue";

export default {
  components: {
    AppFooter,
    BaseLayout,
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
    },
    getModifierKey(cartItem, modifier, index) {
      return cartItem.line_id + '_' + modifier.id + '_' + index;
    },
    goToCheckout() {
      this.$router.push('/checkout');
    }
  }
};
</script>

<style scoped>
.item-remove {
  color: #888;
  font-size: 24px;
  position: absolute;
  right: 975px; /* Отступ от правого края */
  top: 0;
}
.item-quantity {
  position: absolute;
  right: 975px; /* Отступ от правого края */
  top: 32px; /* Отступ от верха */
}
.cart-page {
  min-height: calc(100vh - 122px); /* Высота видимой части окна минус высота футера */
}
</style>

