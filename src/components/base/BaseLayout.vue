<template>
  <ion-page id="main">
    <ion-header>
      <ion-toolbar>
        <div class="header-container bg-custom-color flex items-center justify-between px-5 md:px-0 relative z-10">
          <router-link to="/" class="logo-link">
            <img src="@/assets/img/logoHeader.png" alt="Logo" class="logo mx-4 my-4 w-24 md:ml-315" />
          </router-link>

          <!-- Контейнер для кнопок выбора точки и корзины -->
          <div class="action-buttons flex items-center space-x-1 mr-4 md:mr-315">
            <!-- Кнопка для выбора точки -->
            <ion-button fill="clear" @click="openModal" class="select-shop-button">
              <ion-card class="shop-card" :class="{ 'selected': activeShop }">
                <ion-card-content class="text-center text-[#61473b]">
                  <span v-if="activeShop">{{ activeShop.store_name }}</span>
                  <span v-else>Выбрать точку</span>
                </ion-card-content>
              </ion-card>
            </ion-button>

            <div class="flex items-center space-x-2 md:mr-315">
              <ion-button fill="clear" @click="$router.push('/cart')" class="basket-button p-0">
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

              <!-- Иконка профиля -->
              <ion-button fill="clear" @click="goToProfile" class="profile-button p-0">
                <img
                    src="@/assets/img/profile-icon.png"
                    alt="Profile Icon"
                    class="w-8 h-8"
                />
              </ion-button>

              <!-- Иконка избранного -->
              <ion-button fill="clear" @click="$router.push('/favorites')" class="favorites-button p-0">
                <ion-icon :icon="isFavorite ? heart : heartOutline" class="text-black icon-size" />
              </ion-button>
            </div>
          </div>

          <!-- Модальное окно -->
          <ion-modal :is-open="isModalOpen" @didDismiss="closeModal">
            <div class="modal-container p-4">
              <div class="modal-content">
                <h2 class="text-lg font-bold mb-4 text-white text-center">Выберите точку</h2>
                <ul class="list-none p-0">
                  <li
                      v-for="shop in shops"
                      :key="shop.id"
                      @click="selectShop(shop)"
                      class="cursor-pointer py-2 px-4 rounded-md transition-colors text-center"
                      :class="{ 'bg-[#61473b] text-white': activeShop && activeShop.id === shop.id, 'bg-[#f9d9b8] text-black': !(activeShop && activeShop.id === shop.id) }"
                  >
                    {{ shop.store_name }}
                    <ul v-if="activeShop && activeShop.id === shop.id" class="mt-2">
                      <li
                          v-for="address in shop.addresses"
                          :key="address.id"
                          @click.stop="selectAddress(shop, address)"
                          class="py-1 px-3 rounded-md cursor-pointer transition-colors text-center"
                          :class="{ 'bg-[#61473b] text-white': selectedAddress === address, 'bg-[#f9d9b8] text-black': selectedAddress !== address }"
                      >
                        {{ address }}
                      </li>
                    </ul>
                  </li>
                </ul>
                <ion-button expand="full" @click="closeModal" class="close-button">Закрыть</ion-button>
              </div>
            </div>
          </ion-modal>

        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <slot />
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonBadge, IonModal, IonCard, IonCardContent } from '@ionic/vue';
import { heartOutline } from 'ionicons/icons';

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButton,
    IonBadge,
    IonModal,
    IonCard,
    IonCardContent,
  },
  mounted() {
    this.$store.commit('calculateCartTotal');
    this.$store.dispatch('loadStateFromStorage');
  },
  data() {
    return {
      isModalOpen: false,
      selectedAddress: null,
      heartOutline,
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
    isAuthenticated() {
      return !!this.$store.getters.user.name;
    },
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedAddress = null;
    },
    selectShop(shop) {
      this.$store.commit('selectShop', { shopId: shop.id });
    },
    async selectAddress(shop, address) {
      this.selectedAddress = address;
      this.$store.commit('setActiveShop', { shopId: shop.id, address });
      this.isModalOpen = false;
      try {
        await this.$store.dispatch('loadProducts', shop.id);
        this.$router.push('/');
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
      }
    },
     loadProducts(shopId) {
      return this.$store.dispatch('loadProducts', shopId);
    },
    goToProfile() {
      this.$router.push(this.isAuthenticated ? '/profile' : '/auth');
    }
  },
};
</script>


<style scoped>
.modal-container {
  background-color: #f9d9b8;
  border-radius: 15px;
  border: 10px solid #61473b;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.modal-content {
  background-color: #f9d9b8;
  padding: 60px;
  border-radius: 15px;
  border: 10px solid #61473b;
  text-align: center;
  width: 500px;
}

.close-button {
  background-color: #61473b !important;
  color: white;
  margin-top: 10px;
}

ul li {
  transition: background-color 0.3s ease;
}

ul li:hover {
  background-color: #61473b;
  color: white;
}

.select-shop-button ion-card {
  background-color: transparent; /* Убираем фон */
  box-shadow: none; /* Убираем тень */
  padding-left: 8px;
  padding-right: 8px;
}

.basket-button ion-card {
  background-color: transparent;
  box-shadow: none;
  color: #61473b;
}

.action-buttons {
  margin-right: 1rem;
}

@media (min-width: 768px) {
  .action-buttons {
    margin-right: 315px; /* Отступ справа, как у логотипа */
  }
}

.basket-button {
  margin-left: -8px; /* Перемещаем кнопку корзины чуть левее */
}

/* Новое CSS правило для одинакового размера иконок */
.icon-size {
  width: 28px;
  height: 28px;
}
</style>
