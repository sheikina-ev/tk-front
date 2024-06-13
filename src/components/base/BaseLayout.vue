<template>
  <ion-page id="main">
    <ion-header>
      <ion-toolbar class="catalog-header bg-custom-color">
        <div class="header-container flex items-center justify-between px-5 md:px-0" style="padding-left: 315px; padding-right: 315px;">
          <router-link to="/" class="logo-link">
            <img src="@/assets/img/logoHeader.png" alt="Logo" class="logo mx-4 my-4">
          </router-link>
          <div class="flex items-center ml-auto">
            <coffee-shop :shop="activeShop" class="shop"></coffee-shop>
            <ion-button fill="clear" @click="$router.push('/cart')" class="basket-button">
              <div class="basket-container relative flex items-center">
                <img src="../../../public/assets/img/basket.png" height="28" width="33" alt="Basket Icon" class="basket-icon">
                <ion-badge v-if="cartCount > 0" color="danger" class="badge ml-2 absolute top-0 right-0">{{ cartCount }}</ion-badge>
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
import CoffeeShop from "@/components/coffee/CoffeeShop.vue";

export default {
  computed: {
    activeShop() {
      return this.$store.getters.activeShop;
    },
    cartCount() {
      return this.$store.getters.cartCount;
    }
  },
  components: {
    CoffeeShop,
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButton,
    IonBadge
  },
  created() {
    if (!Array.isArray(this.$store.state.shops) || this.$store.state.shops.length === 0) {
      this.$store.dispatch('getStores');
    }
  }
}
</script>

<style scoped>
.bg-custom-color {
  --background: #F9D9B8;
}
.catalog-header {
  height: 120px;
}
</style>
