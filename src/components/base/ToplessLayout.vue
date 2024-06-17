<template>
  <ion-page id="main">
    <ion-content>
      <slot />
    </ion-content>

  </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';

export default {
  props: ['pageTitle', "pageDefaultBackLink"],
  components: {
    IonPage,
    IonContent,

  }
}
</script>