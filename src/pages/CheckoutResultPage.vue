<template>

  <base-layout page-title="Успешное оформление заказа">
    <div class="success-page text-center">
      <h1 class="font-bold text-lg mb-4">Ваш заказ успешно оформлен!</h1>
      <button class="home-link w-40 h-10 rounded-full text-sm font-medium border border-gray-400 cursor-pointer mb-60" @click="goToHomePage">На главную</button>
    </div>
    <AppFooter/>
  </base-layout>
</template>

<script>
import { useRouter } from 'vue-router';
import BaseLayout from "@/components/base/BaseLayout.vue";
import AppFooter from "@/components/base/AppFooter.vue";
export default {
  components: {
    AppFooter,
    BaseLayout
  },
  setup() {
    const router = useRouter();
    const goToHomePage = () => {
      router.push('/');
    };

    return { goToHomePage };

  }
}
</script>

<style scoped>
.success-page {
  margin-top: 232px;
}

.home-link {
  background-color: #F9D9B8;
  border: 1px solid;
}
</style>
