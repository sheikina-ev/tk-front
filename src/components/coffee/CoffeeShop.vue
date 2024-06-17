<template>
  <div class="coffee-shop-wrap">
    <div class="name">
      <span v-if="shop">Меню {{ shop.store_name }}</span>
      <span v-else>Точка не выбрана</span>
    </div>
    <div class="link">
      <ion-button fill="clear" v-if="shop" router-link="/shop" class="arrow-button">
        <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px"><path d="M12 13.172l4.95-4.95.707.707-5.657 5.657-5.657-5.657.707-.707z" fill="#000"/></svg>
      </ion-button>
      <ion-button fill="clear" v-else router-link="/shop" class="arrow-button">
        <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px"><path d="M12 13.172l4.95-4.95.707.707-5.657 5.657-5.657-5.657.707-.707z" fill="#000"/></svg>
      </ion-button>
    </div>
  </div>
</template>

<script>
import { IonButton } from '@ionic/vue';

export default {
  props: ['shop'],
  components: {
    IonButton
  }
}
</script>


