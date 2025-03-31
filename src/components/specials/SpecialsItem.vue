<template>
  <ion-col size="6">
    <transition name="fade-slide" appear>
      <ion-card class="special-content" :class="{ 'skeleton': !special }">
        <div class="content-wrapper">
          <ion-card-title class="center-text">
            <ion-skeleton-text v-if="!special" animated></ion-skeleton-text>
            <span v-else>{{ special.title }}</span>
          </ion-card-title>
          <div v-if="special" class="content-body" v-html="special.content"></div>
        </div>
      </ion-card>
    </transition>
  </ion-col>
</template>

<script>
import { IonCol, IonCard, IonCardTitle, IonSkeletonText } from '@ionic/vue';

export default {
  props: ['special'],
  components: {
    IonCol,
    IonCard,
    IonCardTitle,
    IonSkeletonText
  }
}
</script>

<style scoped>
.special-content {
  color: white;
  padding: 1rem;
  border-radius: 10px;
  background: rgba(97, 71, 59, 0.9); /* Подобран теплый оттенок для фона */
  transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
}

.special-content:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.content-wrapper {
  background: rgba(249, 217, 184, 0.8); /* Используем основной цвет фона для контента */
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}

.skeleton {
  background: rgba(249, 217, 184, 0.8);
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-text {
  font-size: 1.6rem;
  font-weight: bold;
  color: #61473b; /* Цвет текста в заголовке с учетом цвета подвала */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Меньше тени для лучшего контраста */
  margin-bottom: 1rem;
}

/* Оформление контента акции */
.content-body {
  width: 100%;
  color: #61473b; /* Цвет текста более теплый, чтобы он сочетался с подвалом */
  font-size: 1rem;
  line-height: 1.6;
  background: rgba(249, 217, 184, 0.9); /* Цвет фона контента */
  padding: 1.2rem;
  border-radius: 10px;
  margin-top: 10px;
}
</style>
