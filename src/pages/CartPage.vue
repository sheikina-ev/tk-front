<template>
  <base-layout page-title="Корзина">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mb-28">
      <h1 class="cart-header mt-10 mb-9 font-extrabold ml-14 text-lg">Корзина</h1>
      <div class="flex flex-col sm:flex-row justify-between">
        <!-- Левая часть: список товаров -->
        <div class="cart-container w-full sm:w-5/6 md:w-2/3 lg:w-2/3 xl:w-2/3 mb-8 sm:mb-0 ml-8">
          <div v-if="cart.length > 0" class="flex flex-col">
            <div v-for="cartItem in cart" :key="cartItem.line_id" class="">
              <div class="bg-white rounded-lg p-6 flex items-start relative">
                <img :src="cartItem.image" alt="item image" class="w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 object-cover mr-6" />
                <div class="flex-1">
                  <h2 class="text-lg font-semibold mb-1 -mt-1 uppercase">{{ cartItem.name }}</h2>
                  <div v-if="cartItem.modifiers && cartItem.modifiers.length > 0" class="mt-4 mb-4">
                    <h1 class="font-bold text-lg mb-2">Добавки</h1>
                    <span v-for="(modifier, index) in cartItem.modifiers" :key="getModifierKey(cartItem, modifier, index)">
                      <span v-if="modifier.name">{{ modifier.name }}{{ index !== cartItem.modifiers.length - 1 ? ', ' : '' }}</span>
                    </span>
                  </div>
                  <div v-else>
                    <h1 class="font-bold text-lg">Добавки</h1>
                    <p class="text-xs">Без добавок</p>
                  </div>
                  <div class="flex items-center justify-between mt-75">
                    <p class="text-lg font-semibold">{{ cartItem.price * cartItem.amount }} руб</p>
                    <div class="flex items-center">
                      <ion-icon :icon="removeCircleOutline" class="text-black text-xl cursor-pointer mr-4" @click="decrement(cartItem)"></ion-icon>
                      <span class="text-lg text-black">{{ cartItem.amount }}</span>
                      <ion-icon :icon="addCircleOutline" class="text-black text-xl cursor-pointer ml-2" @click="increment(cartItem)"></ion-icon>
                    </div>
                  </div>
                </div>
                <div class="ml-auto"> <!--  ml-auto для выравнивания вправо на мобильных устройствах -->
                  <ion-icon :icon="closeOutline" class="text-black cursor-pointer text-xl" @click="removeItem(cartItem)"></ion-icon>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="center-content text-center mt-8">
            <h2>Корзина пуста</h2>
          </div>
        </div>

        <!-- Правая часть: кнопка "Оформить заказ" и сумма заказа -->
        <div class="order-summary w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3  sm:mt-0 sm:ml-0 ml-0 sm:ml-40 px-4"> <!-- Исправлены классы для отступов -->
          <div v-if="cart.length > 0" class="mb-8">
            <p class="font-medium text-lg mb-16 mt-3 ">
              Сумма заказа<span class="font-bold ml-24">{{ cartTotal }} руб</span>
            </p>
            <button class="w-297 bg-custom-color  text-sm font-medium  py-2 px-4 rounded-full border border-black" style="border: 1px solid black" @click="goToCheckout">
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </div>
    <AppFooter></AppFooter>
  </base-layout>
</template>


<script>
import { IonIcon } from '@ionic/vue';
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
      return `${cartItem.line_id}_${modifier.id}_${index}`;
    },
    goToCheckout() {
      this.$router.push('/checkout');
    }
  }
};
</script>
<style  scoped>
.order-summary {
  min-height: calc(90vh - 155px); /* Высота видимой части окна минус высота футера */
}
</style>

