<template>
  <ion-page id="main">

    <ion-header>
      <ion-toolbar class="catalog-header bg-custom-color">
        <div class="header-container flex items-center justify-between px-5 md:px-0">
          <router-link to="/" class="logo-link">
            <img src="@/assets/img/logoHeader.png" alt="Logo" class="logo mx-4 my-4">
          </router-link>
          <div class="flex items-center ml-auto">
            <div class="coffee-shop-wrap" >
              <div class="name" @mouseover="showAddresses = true" @mouseleave="showAddresses = false">
                <span v-if="activeShop">{{ activeShop.store_name }}</span>
                <span v-else>Точка не выбрана</span>
                <div
                    v-if="showAddresses"
                    class="addresses"
                    ref="addresses"
                >
                <ul v-if="activeShop">
                  <li v-for="address in activeShop.addresses" :key="address.id" @click="selectAddress(address)">
                    {{ address }}
                  </li>
                </ul>
                <ul v-else>
                  <li v-for="shop in shops" :key="shop.id" @click="selectShop(shop)">
                    {{ shop.store_name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ion-button fill="clear" @click="$router.push('/cart')" class="basket-button">
            <div class="basket-container relative flex items-center">
              <img
                  src="../../../public/assets/img/basket.png"
                  height="28"
                  width="33"
                  alt="Basket Icon"
                  class="basket-icon"
              />
              <ion-badge
                  v-if="cartCount > 0"
                  color="danger"
                  class="badge ml-2 absolute top-0 right-0"
              >{{ cartCount }}</ion-badge>
            </div>
          </ion-button>
        </div>
        </div>
      </ion-toolbar>
    </ion-header>
      <ion-content>

      <slot />

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonBadge } from '@ionic/vue';

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButton,
    IonBadge,
  },
  data() {
    return {
      showAddresses: false,
    };
  },
  computed: {
    activeShop() {
      return this.$store.getters.activeShop;
    },
    shops() {
      return this.$store.getters.shops;
    },
    cartCount() {
      return this.$store.getters.cartCount;
    },
  },
  methods: {
    selectShop(shop) {
      this.$store.commit('selectShop', { shopId: shop.id });
      this.showAddresses = false;
      this.loadProducts(shop.id);
    },
    selectAddress(address) {
      console.log('Выбран адрес:', address);
      this.showAddresses = false;
    },
    loadProducts(shopId) {
      this.$store
          .dispatch('loadProducts', shopId)
          .then(() => {

            this.$router.push('/');
          })
          .catch(error => {
            console.error('Ошибка загрузки товаров:', error);
          });
    },
  },
};
</script>

<style scoped>
.bg-custom-color {
  --background: #f9d9b8;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  width: 100px;
  height: auto;
}

.name {
  font-size: 18px;
  color: #000;
  cursor: pointer;
  position: relative;
}

.name:hover .addresses {
  visibility: visible;
}

.addresses {
  position: absolute;
  top: -100%;
  left: 0;
  background-color: #fff;
  border-radius: 5px;
  width: 200px;
  visibility: hidden;
  z-index: 10;
}

.addresses ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.addresses li {
  padding: 8px 10px;
  border-radius: 5px;
  border: 0.5px solid #ccc;
  opacity: 1;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

.addresses li:hover {
  background-color: #61473b;
  border-color: #888;
}

.basket-button {
  padding: 0;
}

.basket-icon {
  margin: 0;
}

.badge {
  top: -5px; /* Корректируем положение значка корзины */
  right: -5px;
}
.catalog-header {
  padding-left: 315px;
  padding-right: 315px;
}
</style>
