<template>
  <div class="not-found-page min-h-screen flex flex-col justify-center items-center bg-gray-100">
    <BaseLayout>
      <div class="not-found-content text-center">
        <h1 class="not-found-heading text-9xl font-light mt-32" style="font-size: 200px;">404</h1>
        <p class="not-found-text font-semibold text-lg mb-8 font-bold	">Страница не найдена</p>
        <button class="home-link w-40 h-10 rounded-full text-sm font-medium border border-gray-400 cursor-pointer mb-48" @click="goToHomePage" style="background-color: #F9D9B8;border: 1px solid;">На главную</button>
      </div>
      <AppFooter/>
    </BaseLayout>
  </div>
</template>

<script>
import BaseLayout from "@/components/base/BaseLayout.vue";
import { useRouter } from 'vue-router';
import AppFooter from "@/components/base/AppFooter.vue";

export default {
  name: 'NotFoundPage',
  components: { AppFooter, BaseLayout },
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
* {
  font-family: 'Montserrat', sans-serif !important;
}

</style>
