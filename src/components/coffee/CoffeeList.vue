<template>
  <div id="app">
    <div id="content">
      <div class="coffee-section-outer-wrap">
        <ion-grid class="product-grid">
          <ion-row class="product-row">
            <ion-col v-for="(coffeeItem, index) in displayedProducts" :key="index" class="product-column">
              <coffee-list-item :coffeeItem="coffeeItem"></coffee-list-item>
            </ion-col>
          </ion-row>
          <ion-row class="ion-justify-content-center" v-if="showLoadMoreButton">
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
          <ion-row v-if="!displayedProducts.length && !isLoading">
            <ion-col>
              <h2 class="text-center">В данной категории нет товаров</h2>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import { IonGrid, IonRow, IonCol } from '@ionic/vue';
import CoffeeListItem from './CoffeeListItem.vue';
import AppFooter from "@/components/base/AppFooter.vue";

export default {
  props: ['sectionId'],
  components: {
    AppFooter,
    IonGrid,
    IonRow,
    IonCol,
    CoffeeListItem
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
      if (Array.isArray(this.products)) {
        return this.products.slice(0, this.visibleProductCount).map((item, index) => {
          // Проверяем, имеет ли элемент свойство 'id', если нет, создаем его
          if (!item.id) {
            item.id = index;
          }
          return item;
        });
      } else {
        return [];
      }
    },
    showLoadMoreButton() {
      return this.products.length > this.visibleProductCount;
    },
  },
  async mounted() {
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.isLoading = true;
      await this.$store.dispatch('getProducts', { params: { id: this.sectionId, shop_id: this.activeShop.id, category_id: 1 } });
      this.isLoading = false;
    },
    async loadMoreProducts() {
      this.visibleProductCount += 16;
    },
  }
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

.coffee-section-outer-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 74px;
  margin-top: 41px;
  padding: 0 315px;
  overflow: hidden;
}

.product-grid {
  width: 100%;
}

.product-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
}

.product-column {
  flex: 1 0 21%;
  max-width: 21%;
  margin: 0 10px;
  box-sizing: border-box;
}

@media (max-width: 1920px) {
  .product-column {
    flex: 1 0 25%;
    max-width: 25%;
  }
}

@media (max-width: 1600px) {
  .product-column {
    flex: 1 0 33.33%;
    max-width: 33.33%;
  }
}

@media (max-width: 1200px) {
  .product-column {
    flex: 1 0 50%;
    max-width: 50%;
  }
}

@media (max-width: 768px) {
  .coffee-section-outer-wrap {
    padding: 0 20px;
  }
  .product-column {
    flex: 1 0 100%;
    max-width: 100%;
  }
}

.click {
  margin-bottom: 20px;
  width: auto;
  color: black;
  border: none;
  background: none;
  display: inline-flex;
  align-items: center;
}
</style>
