<template>
  <ion-page id="main">
    <ion-header>
      <ion-toolbar>
        <div class="header-container flex items-center justify-between px-5 md:px-0 relative z-10">
          <router-link to="/" class="logo-link">
            <img src="@/assets/img/logoHeader.png" alt="Logo" class="logo mx-4 my-4 w-24 md:ml-315" />
          </router-link>
          <div class="flex items-center ml-auto relative text-black md:text-black">
            <div class="coffee-shop-wrap">
              <div
                  class="name relative cursor-pointer"
                  @mouseover="showAddresses = true"
                  @mouseleave="showAddresses = true"
              >
                <span v-if="activeShop">{{ activeShop.store_name }}</span>
                <span v-else>Точка не выбрана</span>
                <div
                    v-if="showAddresses"
                    class="addresses absolute bg-custom-color rounded-md w-48 top-full left-0 shadow-lg"
                    ref="addresses"
                >
                  <ul v-if="activeShop" class="list-none p-0 m-0">
                    <li
                        v-for="address in activeShop.addresses"
                        :key="address.id"
                        @click="selectAddress(address)"
                        class="py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-300"
                    >
                      {{ address }}
                    </li>
                  </ul>
                  <ul v-else class="list-none p-0 m-0">
                    <li
                        v-for="shop in shops"
                        :key="shop.id"
                        @click="selectShop(shop)"
                        class="px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-300"
                    >
                      {{ shop.store_name }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <ion-button fill="clear" @click="$router.push('/cart')" class="basket-button p-0 md:mr-315">
            <div class="basket-container relative flex items-center">
              <img
                  src="../../../public/assets/img/basket.png"
                  height="28"
                  width="33"
                  alt="Basket Icon"
                  class="basket-icon m-0"
              />
              <ion-badge v-if="cartCount > 0" color="danger" class="badge ml-2 absolute top-0 right-0">
                {{ cartCount }}
              </ion-badge>
            </div>
          </ion-button>
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
      showAddresses: true,
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
    async selectShop(shop) {
      this.$store.commit('selectShop', { shopId: shop.id });
      this.showAddresses = false;
      try {
        await this.loadProducts(shop.id);
        this.$router.push('/');
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
      }
    },
    selectAddress(address) {
      console.log('Выбран адрес:', address);
      this.showAddresses = true;
    },
    loadProducts(shopId) {
      return this.$store.dispatch('loadProducts', shopId);
    },
  },
};
</script>
