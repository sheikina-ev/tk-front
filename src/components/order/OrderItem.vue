<template>
  <!-- Отображение информации о заказе -->
  <ion-card v-if="!loading && order" class="order-tracking">
    <ion-card-header>
      <div class="flex-between">
        <span>№{{ order.id }}</span>
        <span>{{ order.time }} {{ order.date }}</span>
      </div>
    </ion-card-header>

    <ion-card-content>
      <!-- Список всех товаров из текущего заказа -->
      <order-item-position
          v-for="product in order.items"
          :key="product.id"
          :product="product"
      />

      <!-- Сумма заказа -->
      <div class="flex-between order-total">
        <span>Итого</span>
        <span>{{ order.total_sum }} руб.</span>
      </div>

      <!-- Адрес магазина -->
      <div v-if="order.store?.store_name" class="order-address">
        {{ order.store.store_name }}
      </div>

      <!-- Кнопка для повторения заказа -->
      <div class="button-container">
        <ion-button expand="block" @click="repeatOrder">
          Повторить заказ
        </ion-button>
      </div>
    </ion-card-content>
  </ion-card>

  <!-- Скелетон для загрузки данных -->
  <ion-card v-if="loading" class="order-tracking">
    <ion-card-header>
      <div class="flex-between">
        <ion-skeleton-text animated style="width: 3em" />
        <ion-skeleton-text animated style="width: 9em" />
      </div>
    </ion-card-header>
    <ion-card-content>
      <ion-skeleton-text animated style="width: 100%" />
      <ion-skeleton-text animated style="width: 100%" />
      <ion-skeleton-text animated style="width: 12em" />
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonSkeletonText,
  IonButton,
  toastController
} from '@ionic/vue';
import OrderItemPosition from './OrderItemPosition.vue';
import api from "@/api/operations";

export default {
  name: 'OrderItem',
  props: ['order'],
  components: {
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonSkeletonText,
    IonButton,
    OrderItemPosition
  },
  data() {
    return {
      loading: false, // Состояние загрузки
    };
  },
  methods: {
    // Метод для повторения заказа
    async repeatOrder() {
      try {
        const orderId = this.order.id; // Получаем ID текущего заказа
        const orderDetails = await this.getOrderDetails(orderId); // Получаем детали заказа

        if (orderDetails && orderDetails.products) {
          this.addProductsToCart(orderDetails.products); // Добавляем продукты в корзину
        } else {
          this.showErrorToast('Не удалось получить товары из заказа.');
        }
      } catch (error) {
        console.error(error);
        this.showErrorToast('Ошибка при повторении заказа.');
      }
    },

// Метод для добавления товаров в корзину
    addProductsToCart(products) {
      products.forEach(product => {
        const cartProduct = {
          productId: product.productId || product.line_id,
          name: product.name || "Неизвестный продукт",
          price: product.price || 0,
          amount: product.amount || 1,
          image: product.image || "default_image.jpg",
          modifiers: product.modifiers || [],
          _uniqueKey: Date.now() + Math.random(),
        };

        const existingProduct = this.$store.state.cart.find(item => item.productId === cartProduct.productId);

        if (existingProduct) {
          this.$store.dispatch('updateCartProductAmount', {
            productId: cartProduct.productId,
            amount: existingProduct.amount + cartProduct.amount,
          });
        } else {
          this.$store.dispatch('addToCart', cartProduct);
        }
      });

      this.showToast('Товары добавлены в корзину!');
      this.$router.push({ path: 'cart' });
    }
    ,

    // Метод для получения данных о заказе
    async getOrderDetails(orderId) {
      try {
        const response = await api.OrderHistory(orderId);
        if (response.status === 200) {
          return response.data;
        } else {
          this.showErrorToast('Не удалось получить информацию о заказе.');
        }
      } catch (error) {
        console.error(error);
        this.showErrorToast('Ошибка при получении данных.');
      }
    },

    // Метод для отображения сообщения об ошибке
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

    // Метод для отображения общего сообщения
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

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.flex-between {
  display: flex;
  justify-content: space-between;
}

.order-total {
  font-weight: bold;
  font-size: 1.2em;
}

.order-address {
  margin-top: 10px;
  font-style: italic;
}
</style>
