<template>
  <base-layout page-title="Мои заказы">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mb-28">
      <h1 class="page-header mt-10 mb-6 text-3xl font-bold text-gray-900">История заказов</h1>

      <!-- Проверяем авторизацию -->
      <div v-if="!isAuthorized" class="auth-prompt">
        <p class="text-center text-lg text-gray-700">Для просмотра истории заказов необходимо авторизоваться.</p>
        <button class="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full text-sm font-medium shadow-lg transition-all" @click="redirectToAuth">Войти</button>
      </div>

      <!-- Загружаем заказы -->
      <div v-else-if="Array.isArray(orders) && orders.length > 0" class="orders-grid">
        <order-item v-for="order in orders" :key="order.id" :order="order" class="order-card">
        </order-item>
      </div>

      <!-- Ошибка при загрузке заказов -->
      <div v-else-if="orders === false" class="error-message">
        <p class="text-center text-red-500">Произошла ошибка при загрузке заказов. Пожалуйста, попробуйте позже.</p>
      </div>

      <!-- Если заказов нет -->
      <div v-else class="center-content">
        <p class="text-center text-lg text-gray-500">У вас пока нет заказов. Сделайте первый!</p>
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

<style scoped>
.page-header {
  color: #1f2937;
  text-align: center;
  margin-bottom: 24px;
}

.auth-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.order-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease;
}

.order-card:hover {
  transform: translateY(-5px);
}

.order-card .order-item {
  padding: 20px;
}

.error-message {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.center-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
}

.bg-custom-color {
  background-color: #4F46E5;
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #4338CA;
}

.repeat-btn {
  background-color: #10B981;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin-top: 10px;
  border: none;
  transition: background-color 0.3s ease;
}

.repeat-btn:hover {
  background-color: #059669;
}

@media (max-width: 768px) {
  .page-header {
    font-size: 2xl;
  }

  .orders-grid {
    grid-template-columns: 1fr;
  }
}
</style>
