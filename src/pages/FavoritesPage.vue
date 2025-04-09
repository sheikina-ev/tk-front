<template>
  <base-layout page-title="Избранные товары">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 mb-28">
      <h1 class="page-header mt-10 mb-6 text-3xl font-bold text-gray-900">Избранные товары</h1>

      <!-- Если нет избранных товаров -->
      <div v-if="favorites.length === 0" class="text-center text-[#61473b] mt-10 text-lg">
        У вас нет избранных товаров.
      </div>

      <!-- Если есть избранные товары -->
      <div v-else class="favorites-grid">
        <div
            v-for="item in favorites"
            :key="item.id"
            class="favorite-card"
        >
          <img
              :src="item.image"
              :alt="item.product_name"
              class="favorite-image"
          />
          <h3 class="favorite-title">{{ item.name }}</h3>
          <p class="favorite-price">{{ item.price }} ₽</p>

          <ion-button
              fill="outline"
              color="danger"
              expand="block"
              @click="removeFavorite(item.id)"
              class="remove-btn"
          >
            Удалить
          </ion-button>
        </div>
      </div>
    </div>

    <AppFooter />
  </base-layout>
</template>

<script>
import {  IonButton } from '@ionic/vue';
import BaseLayout from "@/components/base/BaseLayout.vue";
import AppFooter from "@/components/base/AppFooter.vue";

export default {
  components: {
    AppFooter,
    BaseLayout,

    IonButton,
  },
  computed: {
    favorites() {
      return this.$store.getters.favorites || [];
    },
  },
  methods: {
    removeFavorite(productId) {
      this.$store.commit('removeFavorite', productId);
    },
  },
};
</script>

<style scoped>
.container {
  min-height: calc(70vh - 175px); /* Высота видимой части окна минус высота футера */
}
.page-header {
  color: #1f2937;
  text-align: center;
  margin-bottom: 24px;
}

.favorites-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.favorite-card {
  background: #f9d9b8;
  border-radius: 10px;
  border: 2px solid #61473b;
  padding: 20px;
  position: relative;
  width: 280px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.favorite-card:hover {
  transform: translateY(-5px);
}

.favorite-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.favorite-title {
  color: #61473b;
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 8px;
}

.favorite-price {
  color: #61473b;
  font-size: 1rem;
  margin-bottom: 12px;
}

.remove-btn {
  --border-radius: 12px;
  --padding-start: 12px;
  --padding-end: 12px;
  transition: background-color 0.3s ease;
}

.remove-btn:hover {
  background-color: #ff4f4f;
}

@media (max-width: 768px) {
  .favorites-grid {
    grid-template-columns: 1fr;
  }
}

</style>
