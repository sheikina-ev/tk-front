<template>
  <ion-col size="12">
    <ion-card
        class="special-content"
        :class="{ 'skeleton': !special }"
        :style="special ? getBackgroundStyle(special.image) : ''"
    >
      <div class="content-wrapper">
        <ion-card-title>
          <ion-skeleton-text v-if="!special" animated></ion-skeleton-text>
          <span v-else>{{ special.title }}</span>
        </ion-card-title>
        <ion-card-subtitle>
          <ion-skeleton-text v-if="!special" animated></ion-skeleton-text>
          <span v-else>{{ special.subtitle }}</span>
        </ion-card-subtitle>
      </div>
    </ion-card>
    <p v-if="special" v-html="special.content" class="content-text"></p>
  </ion-col>
</template>

<script>
import { IonCol, IonCard, IonCardTitle, IonCardSubtitle, IonSkeletonText } from '@ionic/vue';

export default {
  props: ['special'],
  components: {
    IonCol,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonSkeletonText
  },
  methods: {
    getBackgroundStyle(image) {
      return `background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image || 'assets/img/no-image.jpg'}) center/cover no-repeat;`;
    }
  }
}
</script>

<style scoped>
.special-content {
  color: white;
  padding: 1rem;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
}

.special-content:hover {
  transform: scale(1.02);
}

.skeleton {
  background: #e0e0e0;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.content-text {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #333;
}
</style>
