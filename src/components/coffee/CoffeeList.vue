<template>
  <div id="app">
    <div id="content">
      <div class="product-wrapper">
        <ion-grid class="product-grid">
          <ion-row class="product-row">
            <ion-col
                v-for="item in displayedProducts"
                :key="item.id"
                class="product-column animate"
            >
              <coffee-list-item :coffeeItem="item" />
            </ion-col>
          </ion-row>

          <!-- Кнопка "Ещё" -->
          <ion-row v-if="showLoadMoreButton" class="ion-justify-content-center">
            <ion-col class="ion-text-center">
              <button @click="loadMoreProducts" class="click">
                <span class="flex items-center">
                  <span class="mr-2">Еще</span>
                  <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px">
                    <path d="M12 13.172l4.95-4.95.707.707-5.657 5.657-5.657-5.657.707-.707z" fill="#000"/>
                  </svg>
                </span>
              </button>
            </ion-col>
          </ion-row>

          <!-- Нет товаров -->
          <ion-row v-if="!displayedProducts.length && !isLoading">
            <ion-col class="ion-text-center">
              <h2>Товары не найдены</h2>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import { IonGrid, IonRow, IonCol } from '@ionic/vue';
import CoffeeListItem from './CoffeeListItem.vue';
import AppFooter from '@/components/base/AppFooter.vue';

export default {
  props: ['sectionId'],
  components: {
    AppFooter,
    IonGrid,
    IonRow,
    IonCol,
    CoffeeListItem,
  },
  data() {
    return {
      visibleProductCount: 16,
      isLoading: false,
    };
  },
  computed: {
    products() {
      return this.$store.getters.products;
    },
    activeShop() {
      return this.$store.getters.activeShop;
    },
    displayedProducts() {
      return Array.isArray(this.products)
          ? this.products.slice(0, this.visibleProductCount)
          : [];
    },
    showLoadMoreButton() {
      return this.products.length > this.visibleProductCount;
    },
  },
  watch: {
    activeShop: {
      immediate: true,
      handler(newShop) {
        if (newShop) this.fetchProducts(newShop.id);
      },
    },
  },
  methods: {
    async fetchProducts(shopId) {
      this.isLoading = true;
      await this.$store.dispatch('getProducts', {
        params: { id: this.sectionId, shop_id: shopId, category_id: 1 },
      });
      this.isLoading = false;
    },
    loadMoreProducts() {
      this.visibleProductCount += 16;
    },
  },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#content {
  flex: 1;
}

.product-wrapper {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  margin-bottom: 80px;
}

.product-grid {
  width: 100%;
  max-width: 1400px;
}

.product-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}

.product-column {
  flex: 1 0 22%;
  max-width: 22%;
  transition: all 0.3s ease;
  animation: fadeInUp 0.4s ease;
}

@media (max-width: 1200px) {
  .product-column {
    flex: 1 0 45%;
    max-width: 45%;
  }
}

@media (max-width: 768px) {
  .product-column {
    flex: 1 0 100%;
    max-width: 100%;
  }
}


@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
