<template>
  <ion-col size="6">
    <transition name="fade-slide" appear>
      <ion-card :class="['special-content', { 'skeleton': !special }]">
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
.center-text {
  font-size: 1.6rem;
  font-weight: bold;
  color: #61473b; /* Цвет текста в заголовке с учетом цвета подвала */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Меньше тени для лучшего контраста */
  margin-bottom: 1rem;
}
</style>
