<template>
  <base-layout page-title="Профиль">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mb-28">
      <h1 class="page-header mt-10 mb-6 text-3xl font-bold text-gray-900">Мой профиль</h1>

      <div v-if="user && user.phone" class="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto mb-10">
        <!-- Профиль -->
        <div v-if="!isEditing">
          <p class="mb-2"><b>Имя:</b> {{ user.name }}</p>
          <p class="mb-4"><b>Телефон:</b> {{ user.phone }}</p>
          <div class="flex justify-center">
            <ion-button
                class="btn-classic w-36 h-9 rounded-full text-white text-sm font-medium border transition-transform hover:scale-105"
                @click="startEditing"
            >
              Редактировать
            </ion-button>
          </div>
        </div>

        <!-- Редактирование -->
        <div v-else>
          <label class="block font-medium text-gray-700 mb-1">Имя:</label>
          <input
              v-model="editedName"
              type="text"
              class="p-2 rounded bg-gray-100 border border-gray-300 w-full mb-4"
          />
          <p class="mb-4"><b>Телефон:</b> {{ user.phone }}</p>

          <div class="flex gap-2 justify-center">
            <ion-button
                class="bg-green-500 w-36 h-9 text-white rounded-full text-sm font-medium hover:scale-105"
                @click="saveChanges"
            >
              Сохранить
            </ion-button>
            <ion-button
                class="bg-red-500 w-36 h-9 text-white rounded-full text-sm font-medium hover:scale-105"
                @click="cancelEditing"
            >
              Отмена
            </ion-button>
          </div>
        </div>

        <div class="flex justify-center mt-6">
          <ion-button
              class="bg-gray-700 w-36 h-9 text-white rounded-full text-sm font-medium hover:scale-105"
              @click="confirmLogout"
          >
            Выйти
          </ion-button>
        </div>
      </div>

      <!-- Заказы -->
      <div v-if="orders.length > 0" class="max-w-7xl mx-auto">
        <h2 class="text-2xl font-semibold mb-6 text-center">Последние заказы</h2>
        <div class="orders-grid">
          <order-item
              v-for="order in orders.slice(0, 4)"
              :key="order.id"
              :order="order"
              class="order-card"
          />
        </div>

        <div class="flex justify-center mt-6">
          <router-link to="/orders">
            <ion-button>
              Смотреть все заказы
            </ion-button>
          </router-link>
        </div>
      </div>

      <!-- Нет заказов -->
      <div v-else-if="ordersLoaded" class="center-content text-gray-500 text-lg">
        У вас пока нет заказов
      </div>
      <div v-else class="center-content text-gray-500 text-lg">
        Загружаем заказы...
      </div>

      <!-- Модалка выхода -->
      <div v-if="showConfirmModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-80">
          <h2 class="text-lg font-bold mb-4">Вы уверены?</h2>
          <p class="text-gray-600 mb-4">Вы действительно хотите выйти?</p>
          <div class="flex justify-between">
            <ion-button class="px-4 py-2 rounded-md" @click="showConfirmModal = false">Отмена</ion-button>
            <ion-button @click="logout">Выйти</ion-button>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </base-layout>
</template>

<script>
import BaseLayout from "@/components/base/BaseLayout.vue";
import AppFooter from "@/components/base/AppFooter.vue";
import OrderItem from "@/components/order/OrderItem.vue";
import operations from "@/api/operations";

export default {
  components: {
    AppFooter,
    BaseLayout,
    OrderItem
  },
  data() {
    return {
      showConfirmModal: false,
      isEditing: false,
      editedName: "",
      orders: [],
      ordersLoaded: false,
      errorMessage: "",  // Для отображения ошибок
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    if (!this.user || !this.user.name) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        this.$store.commit("setUser", JSON.parse(savedUser));
      } else {
        this.$store.dispatch("fetchUser");
      }
    }

    this.fetchOrders();
  },
  methods: {
    startEditing() {
      this.isEditing = true;
      this.editedName = this.user.name;
    },
    async saveChanges() {
      if (!this.editedName.trim()) {
        alert("Имя не может быть пустым!");
        return;
      }

      try {
        const response = await operations.updateName({
          name: this.editedName,
          api_token: this.user.api_token,
        });

        if (response.status === 200) {
          const updatedUser = {...this.user, name: this.editedName};
          localStorage.setItem("user", JSON.stringify(updatedUser));
          this.$store.commit("setUser", updatedUser);
          alert("Имя успешно обновлено!");
        } else {
          alert("Ошибка при обновлении имени.");
        }
      } catch (error) {
        alert("Произошла ошибка. Попробуйте позже.");
      }

      this.isEditing = false;
    },
    cancelEditing() {
      this.isEditing = false;
      this.editedName = this.user.name;
    },
    confirmLogout() {
      this.showConfirmModal = true;
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/auth");
      this.showConfirmModal = false;
    },
    async fetchOrders() {
      try {
        const phoneNumber = String(this.user.phone);

        const response = await operations.getOrderHistory(phoneNumber);

        console.log("Ответ от сервера:", response);

        if (response.status === 200) {
          // Исправлено: теперь мы используем 'orders_list' вместо 'orders'
          this.orders = response.data.orders_list || [];
          console.log("Заказы:", this.orders);
        } else {
          this.errorMessage = 'Не удалось загрузить заказы.';
        }
      } catch (error) {
        this.errorMessage = 'Произошла ошибка при загрузке заказов.';
        console.error("Ошибка при загрузке заказов", error);
      } finally {
        this.ordersLoaded = true;
      }
    }

  },
};
</script>

<style scoped>
.page-header {
  color: #1f2937;
  text-align: center;
  margin-bottom: 24px;
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
  justify-content: center; /* Центрирование по горизонтали */
  align-items: center; /* Центрирование по вертикали */
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

.center-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20vh;
}

.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.gap-2 {
  gap: 0.5rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}
</style>
