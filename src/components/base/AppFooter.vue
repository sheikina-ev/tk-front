<template>
  <div class="flex flex-col md:flex-row justify-between items-center p-5 bg-brown-800 text-white" style="background-color: #553b2f; height: 333px; padding-left: 315px; padding-right: 315px;">
    <div class="flex justify-center md:mb-0">
      <img src="@/assets/img/logo.png" alt="Logo" class="w-[188px] h-[248px]" style="width: 190px; height: 198px" />
    </div>
    <div class="flex-2 flex md:flex-row w-full md:w-auto">
      <!-- Блок с ссылками для клиентов -->
      <div class="flex flex-col  mb-4 md:mb-0" style="margin-right: 270px;">
        <h2 class="mb-8 py-1">КЛИЕНТАМ</h2>
        <ul class="list-none p-0">
          <li class="mb-8"><router-link to="/" class="text-white hover">Меню</router-link></li>
          <li class="mb-2"><router-link to="/cart" class="text-white hover">Корзина</router-link></li>
        </ul>
      </div>
      <!-- Конец блока с ссылками для клиентов -->
      <!-- Блок обратной связи -->
      <div class="flex flex-col  mb-4 md:mb-0" style="margin-right: 270px;">
        <h2 class="mb-8 ">ОБРАТНАЯ СВЯЗЬ</h2>
        <ul class="list-none p-0">
          <li class="mb-8"><router-link to="/review" class="text-white hover" style="white-space: nowrap;">Оставить отзыв</router-link></li>
          <li class="mb-2"><router-link to="/feedback" class="text-white hover" style="white-space: nowrap;">Сообщить о технической проблеме</router-link></li>
        </ul>
      </div>
      <!-- Конец блока обратной связи -->
      <!-- Блок с контактной информацией -->
      <div class="w-full md:w-1/2 mb-8 md:mb-0 " style="text-align: end">
        <p class="text-white">{{ firstStorePhone || ' ' }}</p>
        <p v-for="(store, index) in stores" :key="index" class="store-name">{{ store.store_name }}</p>
        <div class="flex  mt-8" >
          <a href="#" class="text-black " style="width: 52px; height: 30px;text-align: end " >
            <img src="@/assets/img/telegram.png" alt="telegram"   height="42" width="41" style="margin-left: 40px"/>
          </a>
          <a href="#" class=" text-black " style="width: 52px; height: 30px;">
            <img src="@/assets/img/vk.png" alt="vk" height="42" width="42"  style="margin-left: 40px"/>
          </a>
        </div>
      </div>
      <!-- Конец блока с контактной информацией -->
    </div>
  </div>
  <div class="flex justify-end -mt-8 text-white"  style="margin-right: 314px; opacity: 0.8">
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
  color: #F9D9B8; /* Цвет при наведении */
}

</style>