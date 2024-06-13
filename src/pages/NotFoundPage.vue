<template>
  <div class="not-found-page">
    <BaseLayout>
      <div class="not-found-content">
        <h1 class="not-found-heading">404</h1>
        <p class="not-found-text">Страница не найдена</p>
        <button class="home-link" @click="goToHomePage">На главную</button>
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
  components: {AppFooter, BaseLayout },
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

.not-found-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #F4F4F4;
}

.not-found-content {
  text-align: center;
}

.not-found-heading {
  margin-top: 125px;
  font-size: 200px;
  font-weight: 300;
}

.not-found-text {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 25px;
}

.home-link {
  width: 140px; /* Фиксированная ширина кнопки */
  height: 35px; /* Фиксированная высота кнопки */
  border-radius: 20px;
  background-color: #F9D9B8;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  border: 1px solid;
  margin-bottom: 189px;
}
</style>
