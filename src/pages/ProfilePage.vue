<template>
  <base-layout page-title="Профиль">
    <div class="profile-page lg:ml-80 px-4 lg:px-0">
      <h1 class="profile-header mt-10 mb-16 font-bold text-lg lg:text-xl">Мой профиль</h1>

      <div v-if="user && user.name && user.phone">
        <p><b>Имя:</b> {{ user.name }}</p>
        <p><b>Телефон:</b> {{ user.phone }}</p>

        <!-- Кнопка выхода с анимацией -->
        <button
            class="btn-classic w-36 h-9 rounded-full bg-red-500 text-white text-sm font-medium border border-black mt-5 transition-transform transform hover:scale-105 active:scale-95"
            @click="confirmLogout"
        >
          Выйти
        </button>
      </div>

      <div v-else>
        <p>Загружаем данные...</p>
      </div>
    </div>

    <!-- Модальное окно подтверждения выхода -->
    <div v-if="showConfirmModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 class="text-lg font-bold mb-4">Вы уверены?</h2>
        <p class="text-gray-600 mb-4">Вы действительно хотите выйти?</p>
        <div class="flex justify-between">
          <button class="px-4 py-2 bg-gray-300 rounded-md" @click="showConfirmModal = false">Отмена</button>
          <button class="px-4 py-2 bg-red-500 text-white rounded-md" @click="logout">Выйти</button>
        </div>
      </div>
    </div>
    <AppFooter></AppFooter>
  </base-layout>
</template>

<script>
import BaseLayout from "@/components/base/BaseLayout.vue";
import AppFooter from "@/components/base/AppFooter.vue";

export default {
  components: {AppFooter, BaseLayout },
  data() {
    return {
      showConfirmModal: false, // Контролирует показ модального окна
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
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
  },
  methods: {
    confirmLogout() {
      this.showConfirmModal = true;
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/auth");
      this.showConfirmModal = false;
    }
  }
};
</script>

<style scoped>
/* Дополнительные стили (если нужны) */
</style>
