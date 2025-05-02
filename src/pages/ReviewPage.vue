<template>
  <base-layout page-title="Отзывы">
    <ion-grid class="max-w-[1500px] mx-auto px-5 lg:px-20">
      <!-- Форма нового отзыва -->
      <ion-row class="flex justify-center">
        <ion-col size-md="8">
          <form @submit.prevent="submitReview" class="bg-white p-8 mt-40 rounded-lg mb-10 shadow-lg border border-gray-300">
            <p class="text-lg mb-4 text-gray-700 text-center">
              Оцените, пожалуйста, наш сервис и качество продуктов...
            </p>

            <div class="flex justify-center mb-6">
              <star-rating
                  @update:rating="setRating"
                  :star-size="20"
                  :show-rating="false"
              />
              <input type="hidden" v-model="reviewData.rating" />
            </div>

            <ion-textarea
                v-model="reviewData.message"
                required
                placeholder="Текст отзыва*"
                class="mb-6 border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#61473b]"
            />

            <div class="flex justify-center">
              <button type="submit" class="w-48 h-9 rounded-full bg-custom-color text-sm font-medium border border-black outline-none mt-4" style="border: 1px solid black">
                Отправить
              </button>
            </div>
          </form>
        </ion-col>
      </ion-row>

      <!-- Фильтр -->
      <ion-row class="flex justify-center mb-6 relative">
        <ion-col size="auto">
          <button
              @click="toggleFilterDropdown"
              class="text-sm text-gray-600 underline hover:text-black transition-all"
          >
            Сортировать по {{ currentFilterLabel }}
            <ion-icon :name="filterDropdownVisible ? 'chevron-up' : 'chevron-down'" />
          </button>
          <div v-if="filterDropdownVisible" class="absolute bg-white border border-gray-200 rounded-lg mt-2 w-40 shadow-md z-10">
            <ion-list>
              <ion-item button @click="setFilter('newest')"><ion-label>Новые</ion-label></ion-item>
              <ion-item button @click="setFilter('oldest')"><ion-label>Старые</ion-label></ion-item>
              <ion-item button @click="setFilter('rating')"><ion-label>По рейтингу</ion-label></ion-item>
            </ion-list>
          </div>
        </ion-col>
      </ion-row>

      <!-- Отзывы -->
      <ion-row class="flex justify-center">
        <ion-col size="12" size-md="8" v-for="review in sortedReviews" :key="review.id" class="mb-4">
          <div class="p-4 bg-white rounded-md border border-gray-200">
            <p class="text-sm text-gray-500 mb-1">{{ new Date(review.created_at).toLocaleDateString('ru-RU') }}</p>
            <star-rating :rating="review.rating" :star-size="18" :show-rating="false" class="mb-2" />
            <p class="text-gray-800 text-[15px]">{{ review.text }}</p>
          </div>
        </ion-col>

        <div v-if="reviews.length === 0" class="text-center text-gray-600 w-full">
          <p>Отзывов пока нет</p>
        </div>
      </ion-row>

      <!-- Кнопка "Показать еще" -->
      <div v-if="reviews.length > visibleCount" class="flex justify-center mt-6">
        <button @click="loadMore" class="text-sm px-6 py-2 border border-gray-400 rounded-full hover:bg-gray-100 transition-all mb-4">
          Показать ещё
        </button>
      </div>
    </ion-grid>

    <AppFooter />
  </base-layout>
</template>

<script>
import {
  IonGrid, IonRow, IonCol, IonTextarea,
  IonList, IonItem, IonLabel, IonIcon,
  toastController
} from '@ionic/vue';
import StarRating from 'vue-star-rating';
import BaseLayout from '@/components/base/BaseLayout.vue';
import AppFooter from '@/components/base/AppFooter.vue';
import api from "@/api/api";

export default {
  components: {
    BaseLayout, AppFooter,
    IonGrid, IonRow, IonCol,
    IonTextarea, IonList, IonItem, IonLabel, IonIcon,
    StarRating
  },
  data() {
    return {
      // Данные нового отзыва
      reviewData: {
        rating: 0,
        message: '',
      },
      reviews: [],                 // Массив отзывов
      filter: 'newest',            // Текущий фильтр сортировки
      filterDropdownVisible: false, // Видимость выпадающего списка фильтров
      visibleCount: 5,             // Количество видимых отзывов
    };
  },

  computed: {
    // Отсортированные отзывы в зависимости от выбранного фильтра
    sortedReviews() {
      const sorted = [...this.reviews];
      if (this.filter === 'newest') {
        sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else if (this.filter === 'oldest') {
        sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      } else if (this.filter === 'rating') {
        sorted.sort((a, b) => b.rating - a.rating);
      }
      return sorted.slice(0, this.visibleCount);
    },
    // Имя текущего фильтра
    currentFilterLabel() {
      switch (this.filter) {
        case 'newest':
          return 'новым';
        case 'oldest':
          return 'старым';
        case 'rating':
          return 'рейтингу';
        default:
          return '';
      }
    }
  },
  mounted() {
    this.fetchReviews(); // Загружаем отзывы при монтировании компонента
  },

  methods: {
    // Загрузка отзывов с сервера
    async fetchReviews() {
      try {
        const response = await api.get('reviews');
        this.reviews = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
      }
    },
    // Установка рейтинга из компонента звёзд
    setRating(rating) {
      this.reviewData.rating = rating;
    },
    // Показать/скрыть фильтр
    toggleFilterDropdown() {
      this.filterDropdownVisible = !this.filterDropdownVisible;
    },
    // Установить выбранный фильтр
    setFilter(filterType) {
      this.filter = filterType;
      this.filterDropdownVisible = false;
    },
    // Отправка нового отзыва на сервер
    async submitReview() {
      if (!this.reviewData.message.trim()) return;
      try {
        const response = await api.post('review/send', this.reviewData);
        if (response.status === 201 || response.status === 200) {
          this.reviewData.rating = 0;
          this.reviewData.message = '';
          await this.presentToast('Ваш отзыв отправлен. Спасибо!');
          this.fetchReviews();
        } else {
          await this.presentToast('Произошла ошибка. Попробуйте позже.');
        }
      } catch (error) {
        console.error('Ошибка при отправке отзыва:', error);
        await this.presentToast('Ошибка при отправке отзыва.');
      }
    },
    // Показ уведомления (toast)
    async presentToast(message) {
      const toast = await toastController.create({
        message,
        position: 'bottom',
        duration: 3000,
        mode: 'md',
      });
      await toast.present();
    },
    // Загрузка дополнительных отзывов
    loadMore() {
      this.visibleCount += 5;
    }
  }
};
</script>


