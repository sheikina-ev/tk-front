<template>
  <div class="bg-custom-color1 text-white p-10">
    <div class="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
      <!-- Логотип -->
      <div class="flex justify-center md:justify-start w-full md:w-auto">
        <img src="@/assets/img/logo.png" alt="Logo" class="w-48 h-52 md:w-60 md:h-60" />
      </div>

      <div class="flex flex-col md:flex-row space-y-4 md:space-x-36 md:mr-44 w-full md:w-auto">
        <!-- Блок с ссылками для клиентов -->
        <div class="flex flex-col mb-4 md:mb-0">
          <h2 class="mb-4 md:mb-8 py-1">КЛИЕНТАМ</h2>
          <ul class="list-none p-0">
            <li class="mb-2"><router-link to="/" class="text-white hover">Меню</router-link></li>
            <li class="mb-2"><router-link to="/specials" class="text-white hover">Акции</router-link></li>
            <li class="mb-2"><router-link to="/info" class="text-white hover">Новости</router-link></li>
            <li class="mb-2"><router-link to="/cart" class="text-white hover">Корзина</router-link></li>
          </ul>
        </div>
        <!-- Конец блока с ссылками для клиентов -->

        <!-- Блок обратной связи -->
        <div class="flex flex-col mb-4 ">
          <h2 class="mb-0 md:mb-2 py-0 -mt-3">ОБРАТНАЯ СВЯЗЬ</h2>
          <ul class="list-none p-0">
            <li class="mt-7"><router-link to="/review" class="text-white hover" style="white-space: nowrap;">Оставить отзыв</router-link></li>
            <li class="mt-2"><router-link to="/feedback" class="text-white hover" style="white-space: nowrap;">Сообщить о технической проблеме</router-link></li>
          </ul>
        </div>
        <!-- Конец блока обратной связи -->

        <!-- Контакты -->
          <div class="min-w-1 md:text-right">
            <p class="font-bold">{{ firstStorePhone || ' ' }}</p>
            <div v-for="(store, index) in stores" :key="index" class="text-sm mb-2">{{ store.store_name }}</div>
            <div class="flex justify-start md:justify-end gap-4 mt-4">
              <a href="https://t.me/sibcode_team" target="_blank">
                <img src="@/assets/img/telegram.png" alt="Telegram" class="social-icon" />
              </a>
              <a href="#" target="_blank">
                <img src="@/assets/img/vk.png" alt="VK" class="social-icon" />
              </a>
            </div>
          </div>

      </div>
    </div>
    <div class="text-center md:text-right mt-8 text-sm opacity-80">
      <p>Разработано Sibcode</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['shops']),
    firstStorePhone() {
      if (Array.isArray(this.shops) && this.shops.length > 0) {
        const firstStoreWithPhone = this.shops.find(store => store.store_phone !== null);
        return firstStoreWithPhone ? firstStoreWithPhone.store_phone : null;
      }
      return null;
    },
    stores() {
      return this.shops || [];
    }
  },
  created() {
    if (this.shops.length === 0) {
      this.$store.dispatch('getStores');
    }
  }
}
</script>

<style scoped>
.hover:hover {
  color: #F9D9B8;
}
</style>

