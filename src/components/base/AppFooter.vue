<template>
  <div class="flex flex-col md:flex-row justify-between items-center bg-custom-color1 p-5 text-white md:px-32 md:py-10">
    <div class="flex justify-center ml-44 mb-4 md:mb-0">
      <img src="@/assets/img/logo.png" alt="Logo" class="w-48 h-52 md:w-60 md:h-60" />
    </div>
    <div class="flex flex-col md:flex-row w-full md:w-auto md:space-x-297 md:mr-44">
      <!-- Блок с ссылками для клиентов -->
      <div class="flex flex-col mb-4 md:mb-0 ">
        <h2 class="mb-4 md:mb-8 py-1">КЛИЕНТАМ</h2>
        <ul class="list-none p-0">
          <li class="mb-2 md:mb-8"><router-link to="/" class="text-white hover">Меню</router-link></li>
          <li class="mb-2"><router-link to="/cart" class="text-white hover">Корзина</router-link></li>
        </ul>
      </div>
      <!-- Конец блока с ссылками для клиентов -->
      <!-- Блок обратной связи -->
      <div class="flex flex-col mb-4 md:mb-0">
        <h2 class="mb-4 md:mb-8 py-1">ОБРАТНАЯ СВЯЗЬ</h2>
        <ul class="list-none p-0">
          <li class="mb-2 md:mb-9"><router-link to="/review" class="text-white hover" style="white-space: nowrap;">Оставить отзыв</router-link></li>
          <li class="mb-2"><router-link to="/feedback" class="text-white hover" style="white-space: nowrap;">Сообщить о технической проблеме</router-link></li>
        </ul>
      </div>
      <!-- Конец блока обратной связи -->
      <!-- Блок с контактной информацией -->
      <div class="w-full md:w-1/2 mb-8 md:mb-0  md:text-right ">
        <p class="text-white">{{ firstStorePhone || ' ' }}</p>
        <p v-for="(store, index) in stores" :key="index" class="store-name">{{ store.store_name }}</p>
        <div class="flex justify-center md:justify-end mt-4 py-1 -mr-2 md:mt-8">
          <a href="#" class="text-black mx-2 ">
            <img src="@/assets/img/telegram.png" alt="telegram" class="w-8 h-8" />
          </a>
          <a href="#" class="text-black mx-2">
            <img src="@/assets/img/vk.png" alt="vk" class="w-8 h-8" />
          </a>
        </div>
      </div>
      <!-- Конец блока с контактной информацией -->
    </div>
  </div>
  <div class="flex justify-center md:justify-end  -mt-14 text-white opacity-80  md:mr-297">
    <p>Разработано Sibcode</p>
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

<style>
.hover:hover {
  color: #F9D9B8;
}
</style>
