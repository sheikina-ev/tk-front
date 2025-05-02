<template>
  <base-layout page-title="Мои заказы">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mb-28">
      <h1 class="mt-10 mb-6 text-3xl font-bold text-gray-900 text-center">История заказов</h1>

      <!-- Не авторизован -->
      <div v-if="!isAuthorized" class="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p class="text-lg text-gray-700">Для просмотра истории заказов необходимо авторизоваться.</p>
        <div class="mt-6">
          <ion-button @click="redirectToAuth">
            Войти
          </ion-button>
        </div>
      </div>

      <!-- Есть заказы -->
      <div v-else-if="Array.isArray(orders) && orders.length > 0" class="flex flex-wrap justify-center gap-5">
        <order-item
            v-for="order in orders"
            :key="order.id"
            :order="order"
            class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:-translate-y-1 w-[300px]"
        />
      </div>

      <!-- Ошибка при загрузке -->
      <div v-else-if="orders === false" class="flex justify-center items-center min-h-[60vh]">
        <p class="text-center text-red-500">Произошла ошибка при загрузке заказов. Пожалуйста, попробуйте позже.</p>
      </div>

      <!-- Заказов нет -->
      <div v-else class="flex flex-col justify-center items-center min-h-[60vh] text-center">
        <p class="text-lg text-gray-500">У вас пока нет заказов. Сделайте первый!</p>
        <div class="mt-6">
          <ion-button @click="redirectToAuth">Сделать первый заказ</ion-button>
        </div>
      </div>
    </div>

    <AppFooter />
  </base-layout>
</template>


<script>
import OrderItem from '../components/order/OrderItem.vue';
import BaseLayout from "@/components/base/BaseLayout.vue";
import AppFooter from "@/components/base/AppFooter.vue";

export default {
  components: {
    AppFooter,
    BaseLayout,
    OrderItem
  },
  ionViewWillEnter() {
    if (this.isAuthorized && this.user?.phone) {
      this.$store.dispatch('getOrderHistory', this.user.phone);
    }
  },
  computed: {
    isAuthorized() {
      return this.$store.getters.isAuthenticated;
    },
    user() {
      return this.$store.getters.user;
    },
    orders() {
      return this.$store.getters.orders;
    }
  },
  methods: {
    redirectToAuth() {
      this.$router.push('/auth');
    }
  }
}
</script>


