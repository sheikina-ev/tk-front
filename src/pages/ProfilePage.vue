<template>
  <base-layout page-title="Профиль">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mb-28">
      <h1 class="mt-10 mb-6 text-3xl font-bold text-gray-900 text-center">Мой профиль</h1>

      <div v-if="user && user.phone" class="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto mb-10">
        <!-- Профиль (режим просмотра) -->
        <div v-if="!isEditing">
          <p class="mb-2"><b>Имя:</b> {{ user.name }}</p>
          <p class="mb-4"><b>Телефон:</b> {{ user.phone }}</p>
          <div class="flex justify-center">
            <ion-button
                class="w-36 h-9 rounded-full text-white text-sm font-medium border transition-transform hover:scale-105"
                @click="startEditing"
            >
              Редактировать
            </ion-button>
          </div>
        </div>

        <!-- Профиль (режим редактирования) -->
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

      <!-- Блок заказов -->
      <div v-if="orders.length > 0" class="max-w-7xl mx-auto">
        <h2 class="text-2xl font-semibold mb-6 text-center">Последние заказы</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
          <order-item
              v-for="order in orders.slice(0, 3)"
              :key="order.id"
              :order="order"
              class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:-translate-y-1 w-[340px]"
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

      <!-- Если заказов нет -->
      <div v-else-if="ordersLoaded" class="flex flex-col justify-center items-center min-h-[20vh] text-gray-500 text-lg">
        У вас пока нет заказов
      </div>
      <div v-else class="flex flex-col justify-center items-center min-h-[20vh] text-gray-500 text-lg">
        Загружаем заказы...
      </div>

      <!-- Модальное окно подтверждения выхода -->
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
      showConfirmModal: false, // Флаг отображения модалки выхода
      isEditing: false,        // Режим редактирования профиля
      editedName: "",          // Временное имя при редактировании
      orders: [],              // Заказы пользователя
      ordersLoaded: false,     // Флаг, что заказы загружены
      errorMessage: "",        // Сообщение об ошибке (не используется в шаблоне, но может быть полезным)
    };
  },
  computed: {
    // Получаем текущего пользователя из Vuex
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    // При монтировании проверяем, есть ли пользователь, иначе загружаем
    if (!this.user || !this.user.name) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        this.$store.commit("setUser", JSON.parse(savedUser));
      } else {
        this.$store.dispatch("fetchUser");
      }
    }

    // Загружаем историю заказов
    this.fetchOrders();
  },
  methods: {
    // Включаем режим редактирования
    startEditing() {
      this.isEditing = true;
      this.editedName = this.user.name;
    },

    // Сохраняем изменения имени пользователя
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
          const updatedUser = { ...this.user, name: this.editedName };
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

    // Отмена редактирования
    cancelEditing() {
      this.isEditing = false;
      this.editedName = this.user.name;
    },

    // Показываем модалку выхода
    confirmLogout() {
      this.showConfirmModal = true;
    },

    // Выходим из профиля
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/auth");
      this.showConfirmModal = false;
    },

    // Получение заказов пользователя
    async fetchOrders() {
      try {
        const phoneNumber = String(this.user.phone);
        const response = await operations.getOrderHistory(phoneNumber);

        if (response.status === 200) {
          this.orders = response.data.orders_list || [];
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
