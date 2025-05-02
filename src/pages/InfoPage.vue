<template>
  <base-layout page-title="Новости">
    <div class="min-h-screen flex flex-col">
      <div class="px-4 sm:px-6 lg:px-20 mt-10 flex-grow">
        <!-- Сетка для отображения новостей -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Перебор новостей -->
          <div
              v-for="newsItem in news"
              :key="newsItem.code"
              class="bg-custom-color border-4 border-custom-color1 text-brown-800 rounded-xl p-6 text-center shadow-md transition-transform transform hover:translate-y-1 hover:shadow-lg"
          >
            <!-- Заголовок новости -->
            <h2 class="text-xl font-bold text-brown-900 uppercase mb-3">{{ newsItem.title }}</h2>

            <!-- Контент новости -->
            <div
                v-html="newsItem.content"
                class="text-sm text-brown-800 leading-relaxed "
            ></div>
          </div>
        </div>

        <!-- Если новостей нет -->
        <div v-if="news.length === 0" class="text-center text-gray-600 mt-10">
          <p>Новости не найдены</p>
        </div>
      </div>

      <div class="mt-10">
        <AppFooter />
      </div>
    </div>
  </base-layout>
</template>

<script>
import BaseLayout from '@/components/base/BaseLayout.vue';
import AppFooter from '@/components/base/AppFooter.vue';
import { toastController } from '@ionic/vue';
import operations from "@/api/operations";

export default {
  components: {
    BaseLayout,
    AppFooter,
  },
  data() {
    return {
      news: [],  // Список новостей
      errorMessage: '',  // Сообщение об ошибке
    };
  },
  mounted() {
    this.fetchNews();  // Загружаем новости при монтировании компонента
  },
  methods: {
    // Метод для получения новостей
    async fetchNews() {
      try {
        // Запрашиваем новости
        const response = await operations.getInfoPage();

        // Логируем ответ для отладки
        console.log("Ответ API:", response);

        // Проверяем структуру ответа
        if (response?.data?.status === 'OK' && Array.isArray(response.data.data)) {
          // Если всё ок, присваиваем новости
          this.news = response.data.data;
        } else {
          // Если статус не 'OK', выводим ошибку
          this.handleError('Не удалось получить новости. Статус: ' + (response.data.status || 'Неизвестный'));
        }
      } catch (error) {
        // Если произошла ошибка, выводим сообщение
        this.handleError('Произошла ошибка при загрузке данных.');
        console.error('Ошибка при загрузке данных новостей:', error);
      }
    },

    // Метод для обработки ошибок
    async handleError(message) {
      this.errorMessage = message;  // Сохраняем ошибку
      await this.presentToast(message);  // Показываем уведомление
    },

    // Метод для показа сообщений об ошибке (тостов)
    async presentToast(message) {
      const toast = await toastController.create({
        message,
        position: 'bottom',
        duration: 2000,  //  Время показа
        color: 'danger',  // Используем красный цвет для ошибки
      });
      await toast.present();
    }
  }
};
</script>


