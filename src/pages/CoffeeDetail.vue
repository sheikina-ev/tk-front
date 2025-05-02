<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="dismissModal">
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="no-scroll">
      <div class="flex flex-col items-center p-6 bg-gray-100 min-h-full">
        <form id="coffee-detail" class="flex flex-col gap-6 w-full max-w-xl bg-white p-6 rounded-2xl shadow-xl animate-fade-in">
          <input type="hidden" name="id" :value="coffeeItem.id">
          <input type="hidden" name="price" :value="coffeeItem.price">

          <div class="flex gap-5 items-center">
            <div
                class="relative w-28 h-28 rounded-xl bg-center bg-cover shadow-md"
                :style="coffeeItem.image ? 'background-image:url(' + coffeeItem.image + ')' : 'background-image:url(../assets/img/no-image-contrast.jpg)'">
              <div class="absolute inset-0 bg-black/30 rounded-xl"></div>
            </div>

            <div>
              <h1 class="text-xl font-bold text-gray-800">{{ coffeeItem.product_name || 'Название товара не известно' }}</h1>
              <p class="text-sm text-gray-500">{{ coffeeItem.product_description || 'Описание отсутствует' }}</p>
            </div>
          </div>

          <div v-if="coffeeItem.energyAmount !== 'NaN' && coffeeItem.proteinsAmount !== 'NaN'">
            <h3 class="text-lg font-semibold text-gray-700">Калорийность "{{ coffeeItem.product_name }}"</h3>
            <div class="grid grid-cols-2 gap-3 mt-2">
              <div class="bg-gray-200 px-4 py-3 rounded-lg text-center text-sm text-gray-800">
                {{ formattedNutrition.energyAmount }} Ккал
              </div>
              <div class="bg-gray-200 px-4 py-3 rounded-lg text-center text-sm text-gray-800">
                {{ formattedNutrition.proteinsAmount }} г Белков
              </div>
              <div class="bg-gray-200 px-4 py-3 rounded-lg text-center text-sm text-gray-800">
                {{ formattedNutrition.fatAmount }} г Жиров
              </div>
              <div class="bg-gray-200 px-4 py-3 rounded-lg text-center text-sm text-gray-800">
                {{ formattedNutrition.carbohydratesAmount }} г Углеводов
              </div>
            </div>
          </div>

          <div v-if="options.length > 0">
            <ion-list v-for="group in options" :key="group.id">
              <ion-radio-group @ionChange="e => setRadioOption(group.id, e.detail.value)" :value="selectedOptions[group.id] || ''">
                <h3 class="text-base font-medium text-gray-600">{{ group.name }}</h3>
                <ion-item lines="none" v-for="option in group.values" :key="option.id" class="rounded-lg mb-2 shadow-sm">
                  <ion-radio :value="option.id" slot="start"></ion-radio>
                  <ion-label class="text-sm">{{ option.name }} - {{ option.price }} руб.</ion-label>
                </ion-item>
              </ion-radio-group>
              <input type="hidden" name="options" :value="selectedOptions[group.id] || ''">
            </ion-list>
          </div>

          <ion-toolbar class="pt-4" color="light">
            <ion-button
                :disabled="calcPrice <= 0"
                @click.prevent="addToCart"
                expand="block"
                type="button"
                color="primary"
            >
              <div class="flex justify-between w-full items-center">
                <span class="flex items-center gap-2">
                  <ion-icon :icon="cartOutline" class="text-lg"></ion-icon>
                  Заказать
                </span>
                <span>{{ calcPrice }} руб.</span>
              </div>
            </ion-button>

            <ion-buttons slot="end">
              <ion-button @click="toggleFavorite">
                <ion-icon :icon="isFavorite ? heart : heartOutline" class="favorite-icon"></ion-icon>
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage, IonHeader, IonContent, IonToolbar,
  IonButtons, IonButton, IonIcon, IonRadioGroup,
  IonRadio, IonLabel, IonItem,
  modalController, toastController,
} from '@ionic/vue';
import { cartOutline, closeOutline, heart, heartOutline } from 'ionicons/icons';
import { useRouter } from "vue-router";

export default {
  name: 'ProductModal',

  props: {
    coffeeItem: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  components: {
    IonPage, IonHeader, IonContent, IonToolbar,
    IonButtons, IonButton, IonIcon, IonRadioGroup,
    IonRadio, IonLabel, IonItem,
  },
  data() {
    return {
      options: [],   // Группы опций (например, размер, добавки)
      selectedOptions: {}, // Выбранные пользователем опции
      calcPrice: 0,
      isFavoriteLocal: false,
    };
  },
  computed: {
    formattedNutrition() {
      return {
        // Форматируем данные по питательной ценности
        carbohydratesAmount: this.coffeeItem.carbohydratesAmount ? parseFloat(this.coffeeItem.carbohydratesAmount).toFixed(1) : '0.0',
        energyAmount: this.coffeeItem.energyAmount ? parseFloat(this.coffeeItem.energyAmount).toFixed(1) : '0.0',
        fatAmount: this.coffeeItem.fatAmount ? parseFloat(this.coffeeItem.fatAmount).toFixed(1) : '0.0',
        proteinsAmount: this.coffeeItem.proteinsAmount ? parseFloat(this.coffeeItem.proteinsAmount).toFixed(1) : '0.0',
      };
    },
    // Проверка, находится ли товар в избранном (через Vuex)
    isFavorite() {
      return this.$store.getters.isFavorite(this.coffeeItem.id);
    }
  },
  setup() {
    const router = useRouter();
    return {
      closeOutline,
      cartOutline,
      heart,
      heartOutline,
      router
    };
  },
  mounted() {
    // Загружаем опции товара при монтировании
    if (this.coffeeItem?.id) {
      this.fetchProductOptions();
      this.isFavoriteLocal = localStorage.getItem(this.favoriteKey) === 'true';
    }
  },
  methods: {
    dismissModal() {
      modalController.dismiss();
    },
    // Переключение избранного
    async toggleFavorite() {
      const product = this.$store.getters.product;
      if (this.$store.getters.isFavorite(product.id)) {
        // Удаляем из избранного
        this.$store.commit('removeFavorite', product.id);
        const toast = await toastController.create({
          message: 'Удалено из избранного',
          position: 'bottom',
          cssClass: 'toast-mb',
          mode: 'md',
          duration: 1000,
          color: 'danger'
        });
        await toast.present();
      } else {
        // Добавляем в избранное
        this.$store.commit('addFavorite', product);
        const toast = await toastController.create({
          message: 'Добавлено в избранное',
          position: 'bottom',
          cssClass: 'toast-mb',
          mode: 'md',
          duration: 1000,
          color: 'success'
        });
        await toast.present();
      }
    },
    // Показываем всплывающее сообщение
    showToast(message, color) {
      toastController.create({
        message,
        position: 'bottom',
        cssClass: 'toast-mb',
        mode: 'md',
        duration: 1000,
        color,
      }).then(toast => toast.present());
    },
    // Получаем доступные опции для товара
    async fetchProductOptions() {
      try {
        const response = await this.$store.dispatch('getProduct', {params: {id: this.coffeeItem.id}});
        if (response?.product?.options) {
          this.options = response.product.options;
          response.product.options.forEach(group => {
            if (group.required && group.values.length > 0) {
              this.selectedOptions[group.id] = group.values[0].id;
            }
          });
          this.calculatePrice();
        }
      } catch (error) {
        console.error('Ошибка при получении опций:', error);
      }
    },
    // Установка выбранной опции
    setRadioOption(groupId, value) {
      this.selectedOptions[groupId] = value;
      this.calculatePrice();
    },
    // Пересчитываем итоговую цену
    calculatePrice() {
      let total = parseFloat(this.coffeeItem.price) || 0;
      for (const groupId in this.selectedOptions) {
        const selectedId = this.selectedOptions[groupId];
        const group = this.options.find(g => g.id == groupId);
        const option = group?.values.find(v => v.id == selectedId);
        if (option?.price) {
          total += parseFloat(option.price);
        }
      }
      this.calcPrice = total;
    },
    // Добавление товара в корзину
    async addToCart() {
      try {
        // Сбор выбранных модификаторов
        const selectedModifiers = Object.entries(this.selectedOptions)
            .map(([groupId, selectedId]) => {
              const group = this.options.find(g => g.id == groupId);
              const option = group?.values.find(v => v.id == selectedId);
              return option ? {
                id: option.id,
                name: option.name,
                price: option.price,
                productId: option.productId || option.id,
                productGroupId: group.id,
                amount: 1
              } : null;
            })
            .filter(Boolean);

        // Уникальный ключ строки заказа (с учетом модификаторов)
        const modifiersPart = selectedModifiers.map(m => `${m.id}:${m.name}:${m.price}`).sort().join('|');
        const lineId = `${this.coffeeItem.id}_${modifiersPart || 'no_mods'}`;

        const product = {
          _uniqueKey: lineId,
          line_id: lineId,
          id: this.coffeeItem.id,
          productId: this.coffeeItem.id,
          name: this.coffeeItem.product_name,
          description: this.coffeeItem.product_description || '',
          image: this.coffeeItem.image || '',
          base_price: parseFloat(this.coffeeItem.price),
          price: this.calcPrice,
          amount: 1,
          modifiers: selectedModifiers
        };

        // Добавление в корзину через Vuex
        await this.$store.dispatch('addToCart', product);

        this.showToast('Товар добавлен в корзину', 'success');
        this.dismissModal();
      } catch (error) {
        console.error('Ошибка при добавлении в корзину:', error);
        this.showToast('Не удалось добавить товар в корзину', 'error');
      }
    }

  }
};
</script>
