<template>
  <div class="p-4">
    <!-- Отображение информации о заказе -->
    <div v-if="!loading && order" class="bg-white rounded-2xl  p-4 mb-6">
      <div class="flex justify-between items-center border-b pb-2 mb-4 text-gray-600 text-sm">
        <span class="font-semibold">№{{ order.id }}</span>
        <span>{{ order.time }} {{ order.date }}</span>
      </div>
      <!-- Список товаров -->
      <order-item-position
          v-for="product in order.items"
          :key="product.id"
          :product="product"
      />

      <!-- Итого -->
      <div class="flex justify-between items-center mt-4 font-semibold text-lg text-gray-800">
        <span>Итого</span>
        <span>{{ order.total_sum }} руб.</span>
      </div>

      <!-- Адрес магазина -->
      <div v-if="order.store?.store_name" class="mt-2 text-sm text-gray-500 italic">
        {{ order.store.store_name }}
      </div>

      <!-- Кнопка повторения заказа -->
      <div class="mt-6">
        <ion-button expand="block" @click="repeatOrder" class="w-full">
          Повторить заказ
        </ion-button>
      </div>
    </div>

    <!-- Скелетон при загрузке -->
    <div v-if="loading" class="bg-white rounded-2xl shadow-md p-4">
      <div class="flex justify-between items-center mb-4">
        <ion-skeleton-text animated style="width: 3em" />
        <ion-skeleton-text animated style="width: 9em" />
      </div>
      <div class="space-y-2">
        <ion-skeleton-text animated style="width: 100%" />
        <ion-skeleton-text animated style="width: 100%" />
        <ion-skeleton-text animated style="width: 12em" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  IonButton,
  IonSkeletonText,
  toastController
} from '@ionic/vue';
import OrderItemPosition from './OrderItemPosition.vue';
import api from "@/api/operations";

export default {
  name: 'OrderItem',
  props: ['order'],  // Получаем объект заказа как пропс
  components: {
    IonButton,
    IonSkeletonText,
    OrderItemPosition
  },
  data() {
    return {
      loading: false,  // Переменная для отслеживания загрузки данных
    };
  },
  methods: {
    // Метод для повторения заказа
    async repeatOrder() {
      try {
        const orderId = this.order.id;  // Получаем ID текущего заказа
        const orderDetails = await this.getOrderDetails(orderId);  // Получаем детали заказа

        if (orderDetails && orderDetails.products) {
          // Если заказ существует и у него есть товары, добавляем их в корзину
          this.addProductsToCart(orderDetails.products);
        } else {
          // Если товаров в заказе нет, показываем ошибку
          this.showErrorToast('Не удалось получить товары из заказа.');
        }
      } catch (error) {
        console.error(error);
        // Если произошла ошибка, показываем ошибку
        this.showErrorToast('Ошибка при повторении заказа.');
      }
    },

    // Метод для добавления товаров из заказа в корзину
    addProductsToCart(products) {
      const productCatalog = this.$store.state.products;  // Получаем каталог продуктов из хранилища

      // Функция для нормализации пути к изображению товара
      const normalizeImagePath = (path) => {
        if (!path) return '/assets/img/no-image.jpg';  // Если путь не указан, возвращаем путь к картинке по умолчанию
        return path.startsWith('/') ? path : '/' + path;  // Если путь не начинается с '/', добавляем '/'
      };

      // Проходим по всем товарам из заказа
      products.forEach(product => {
        const amount = parseInt(product.amount, 10) || 1;  // Определяем количество товара
        const price = parseFloat(product.price) || 0;  // Определяем цену товара

        // Ищем товар в каталоге по ID
        const catalogMatch = productCatalog.find(p =>
            p.id === product.productId || p.id === product.line_id
        );

        // Формируем объект товара для корзины
        const cartProduct = {
          productId: product.productId || product.line_id,  // Используем productId или line_id
          name: product.name || catalogMatch?.name || "Неизвестный продукт",  // Имя товара
          price,  // Цена товара
          amount,  // Количество товара
          image: normalizeImagePath(product.image || catalogMatch?.image),  // Изображение товара
          modifiers: product.modifiers || [],  // Модификаторы товара
          _uniqueKey: Date.now() + Math.random(),  // Уникальный ключ для товара
        };

        // Проверяем, есть ли уже такой товар в корзине
        const existingProductIndex = this.$store.state.cart.findIndex(item =>
            item.productId === cartProduct.productId &&
            JSON.stringify(item.modifiers) === JSON.stringify(cartProduct.modifiers)  // Сравниваем по модификаторам
        );

        if (existingProductIndex !== -1) {
          // Если товар уже есть в корзине, обновляем его количество
          const existingProduct = this.$store.state.cart[existingProductIndex];
          const updatedAmount = existingProduct.amount + cartProduct.amount;

          // Обновляем количество товара в корзине
          this.$store.commit('updateCartProductAmount', {
            productId: cartProduct.productId,
            amount: updatedAmount,
            modifiers: cartProduct.modifiers,
          });
        } else {
          // Если товара нет в корзине, добавляем его
          this.$store.dispatch('addToCart', cartProduct);
        }
      });

      // Показываем сообщение об успешном добавлении товаров в корзину
      this.showToast('Товары добавлены в корзину!');
      // Перенаправляем пользователя в корзину
      this.$router.push({ path: 'cart' });
    },

    // Метод для получения деталей заказа по ID
    async getOrderDetails(orderId) {
      try {
        const response = await api.OrderHistory(orderId);  // Запрос к API для получения данных о заказе
        if (response.status === 200) {
          // Если запрос успешен, возвращаем данные
          return response.data;
        } else {
          // Если запрос не успешен, показываем ошибку
          this.showErrorToast('Не удалось получить информацию о заказе.');
        }
      } catch (error) {
        console.error(error);
        // Если произошла ошибка, показываем ошибку
        this.showErrorToast('Ошибка при получении данных.');
      }
    },

    // Метод для показа ошибки через Toast
    async showErrorToast(message) {
      const toast = await toastController.create({
        message,
        position: 'bottom',
        duration: 2000,
        mode: 'md',
        color: 'danger',
      });
      await toast.present();
    },

    // Метод для показа успешного сообщения через Toast
    async showToast(message) {
      const toast = await toastController.create({
        message,
        position: 'bottom',
        duration: 1500,
        mode: 'md',
      });
      await toast.present();
    }
  }
};
</script>

