<template>
  <base-layout page-title="Наши акции">
    <ion-refresher slot="fixed" @ionRefresh="doRefresh">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <ion-grid v-if="specials.length > 0">
      <ion-row>
        <ion-col v-for="(special, index) in specials" :key="special.key" size="6">
          <transition name="fade-slide" appear>
            <specials-item :special="special" :style="getAnimationDelay(index)"></specials-item>
          </transition>
        </ion-col>
      </ion-row>
    </ion-grid>

    <ion-grid v-else-if="specials.constructor === Boolean && !specials">
      <ion-row>
        <ion-col size="6"><specials-item :special="false"></specials-item></ion-col>
        <ion-col size="6"><specials-item :special="false"></specials-item></ion-col>
      </ion-row>
    </ion-grid>

    <div class="center-content" v-else>
      <h2 class="text-center">Активные акции отсутствуют</h2>
    </div>
    <app-footer>

    </app-footer>
  </base-layout>
</template>

<script>
import { IonGrid, IonRow, IonCol, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { chevronDownCircleOutline } from 'ionicons/icons';
import SpecialsItem from '../components/specials/SpecialsItem.vue';
import AppFooter from "@/components/base/AppFooter.vue";

export default {
  components: {
    AppFooter,
    IonGrid,
    IonRow,
    IonCol,
    IonRefresher,
    IonRefresherContent,
    SpecialsItem
  },
  setup() {
    return { chevronDownCircleOutline };
  },
  async mounted() {
    await this.$store.dispatch('getSpecials');
  },
  computed: {
    specials() {
      return this.$store.getters.specials;
    }
  },
  methods: {
    async doRefresh(e) {
      await this.$store.dispatch('getSpecials');
      e.target.complete();
    },
    getAnimationDelay(index) {
      return {animationDelay: `${index * 100}ms`};
    }
  }
}
</script>

<style scoped>

</style>