<template>
  <base-layout page-title="Вход">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-screen">
      <div class="auth-container bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 class="text-xl font-extrabold mb-6 text-center">Вход в профиль</h1>
        <p class="text-gray-600 text-center mb-6">Войдите, чтобы заказывать кофе заранее и пользоваться нашими акциями!</p>

        <!-- Ввод номера и имени -->
        <form v-if="step === 1" @submit.prevent="requestConfirmationCode">
          <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2">Введите свой номер телефона</label>
            <ion-input
                v-model="phone"
                class="w-full px-4 py-2 border rounded-lg focus:border-custom-color focus:ring-2 focus:ring-custom-color"
                placeholder="+7 (___) ___-__-__"
                type="tel"
                required>
            </ion-input>
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-2">Как Вас зовут?</label>
            <ion-input
                v-model="name"
                class="w-full px-4 py-2 border rounded-lg focus:border-custom-color focus:ring-2 focus:ring-custom-color"
                type="text"
                required>
            </ion-input>
          </div>

          <button
              class="w-full bg-custom-color text-white text-sm font-medium py-3 rounded-full hover:bg-opacity-80 transition"
              type="submit">
            Получить код
          </button>
        </form>

        <!-- Ввод кода из SMS -->
        <form v-if="step === 2" @submit.prevent="sendConfirmationCode">
          <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2">Введите код из SMS</label>
            <ion-input
                v-model="smsCode"
                class="w-full px-4 py-2 border rounded-lg focus:border-custom-color focus:ring-2 focus:ring-custom-color"
                placeholder="1234"
                type="number"
                required>
            </ion-input>
          </div>

          <button
              class="w-full bg-custom-color text-white text-sm font-medium py-3 rounded-full hover:bg-opacity-80 transition"
              type="submit">
            Подтвердить
          </button>
        </form>

        <div class="mt-6 text-center">
          <a @click="openModal" class="text-xs text-gray-500 hover:underline cursor-pointer">
            Обработка персональных данных
          </a>
        </div>
      </div>
    </div>

    <!-- Модальное окно -->
    <ion-modal :is-open="isModalOpen" @didDismiss="closeModal">
      <div class="modal-content p-6 bg-white rounded-lg">
        <h2 class="text-lg font-bold mb-4">Обработка персональных данных</h2>
        <p class="text-sm text-gray-600">
          Мы собираем и храним ваши данные в соответствии с законодательством...
        </p>
        <button class="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg" @click="closeModal">Закрыть</button>
      </div>
    </ion-modal>
  </base-layout>
</template>

<script>
import { IonInput, IonModal } from '@ionic/vue';
import BaseLayout from "@/components/base/BaseLayout.vue";

export default {
  components: {
    BaseLayout,
    IonInput,
    IonModal
  },
  data() {
    return {
      phone: '',
      name: '',
      smsCode: '',
      isModalOpen: false,
      step: 1, // 1 - Ввод номера и имени, 2 - Ввод кода
    };
  },
  methods: {
    formatPhoneNumber(phone) {
      return phone.replace(/^8/, "+7"); // Заменяем 8 на +7
    },

    async requestConfirmationCode() {
      if (!this.phone || !this.name) {
        alert('Введите корректные данные');
        return;
      }

      const formattedPhone = this.formatPhoneNumber(this.phone);

      try {
        const response = await this.$store.dispatch('requestConfirmationCode', {params: {phone: formattedPhone}});
        console.log("Ответ API (SMS):", response);

        if (response?.status === 'OK') {
          this.step = 2; // Переключаем на ввод кода
        } else {
          alert(response?.message || 'Ошибка отправки SMS');
        }
      } catch (error) {
        console.error("Ошибка при отправке SMS:", error);
        alert('Ошибка отправки SMS. Попробуйте снова.');
      }
    },

    async sendConfirmationCode() {
      if (!this.smsCode) {
        alert('Введите код из SMS');
        return;
      }

      try {
        const response = await this.$store.dispatch('sendConfirmationCode', {
          params: {
            phone: this.formatPhoneNumber(this.phone),
            code: this.smsCode
          }
        });

        console.log("Ответ API (Проверка кода):", response);

        if (response?.status === 'OK') {
          this.authorize();
        } else {
          alert(response?.message || 'Неверный код');
        }
      } catch (error) {
        console.error("Ошибка при проверке кода:", error);
        alert('Ошибка проверки кода. Попробуйте снова.');
      }
    },

    async authorize() {
      console.log("Отправка авторизационного запроса:", this.phone, this.name);
      const response = await this.$store.dispatch('login', {phone: this.phone, name: this.name});
      console.log("Ответ API (Авторизация):", response);

      if (response?.success) {
        this.$router.push('/');
      } else {
        alert('Ошибка авторизации');
      }

      try {
        const response = await this.$store.dispatch('login', {
          phone: this.formatPhoneNumber(this.phone),
          name: this.name
        });

        console.log("Ответ API (Авторизация):", response);

        if (response?.success) {
          this.$router.push('/');
        } else {
          alert(response?.message || 'Ошибка авторизации');
        }
      } catch (error) {
        console.error("Ошибка авторизации:", error);
        alert('Ошибка авторизации. Попробуйте снова.');
      }
    },

    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    }
  }
};
</script>

<style scoped>
.auth-container {
  min-height: 400px;
}

.modal-content {
  max-width: 400px;
  margin: auto;
}
</style>
