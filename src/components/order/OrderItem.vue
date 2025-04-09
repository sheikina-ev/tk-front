<template>
  <ion-card v-if="order" class="order-tracking">
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
        <ion-button  expand="block" @click="repeatOrder">
          Повторить заказ
        </ion-button>
      </div>
    </ion-card-content>
  </ion-card>

  <!-- Скелетон для загрузки данных -->
  <ion-card v-else class="order-tracking">
    <ion-card-header>
      <div class="flex-between">
        <ion-skeleton-text animated style="width: 3em" />
        <ion-skeleton-text animated style="width: 9em" />
      </div>
    </ion-card-header>
    <ion-card-content>
      <order-item-position :product="false" />
      <div class="flex-between order-total">
        <ion-skeleton-text animated style="width: 9em" />
      </div>
      <div class="order-address">
        <ion-skeleton-text animated style="width: 12em" />
      </div>
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
import operations from "@/api/operations";

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
  methods: {
    // Метод для повторения заказа
    async repeatOrder() {
      try {
        // Запрос для повторения заказа
        const response = await operations.repeatOrder({
          phone: this.$store.state.user.phone,  // Извлекаем телефон из Vuex
          name: this.$store.state.user.name,    // Имя пользователя из Vuex
          order_id: this.order.id,              // ID текущего заказа
        });

        // Если запрос успешен
        if (response.data.status === 'OK') {
          const products = response.data.products;  // Список продуктов из ответа

          // Логируем каждый продукт перед добавлением в корзину
          console.log('Товары, добавленные в корзину:', products);

          // Добавляем каждый продукт в корзину
          products.forEach(product => {
            this.$store.dispatch('addToCart', product);  // Используем Vuex для добавления товаров
          });

          // Показываем сообщение об успешном добавлении товаров
          const toast = await toastController.create({
            message: 'Товары добавлены в корзину!',
            position: 'bottom',
            duration: 2000,
            mode: 'md',
          });
          await toast.present();

        } else {
          this.showErrorToast('Не удалось повторить заказ.');
        }
      } catch (error) {
        this.showErrorToast('Ошибка при повторении заказа.');
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
