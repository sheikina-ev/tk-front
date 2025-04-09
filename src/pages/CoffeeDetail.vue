<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/coffee" text="" :icon="chevronBack"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ coffeeItem && Object.keys(coffeeItem).length > 0 ? coffeeItem.product_name : 'Загрузка...' }}</ion-title>
      </ion-toolbar>


    </ion-header>
    <ion-content>
      <form id="coffee-detail">
        <input type="hidden" name="id" :value="coffeeItem.id">
        <input type="hidden" name="price" :value="coffeeItem.price">

        <div class="coffee-picture-container" :style="coffeeItem.image ? `background-image:url('`+coffeeItem.image+`')` : `background-image:url('../assets/img/no-image-contrast.jpg')`">
          <div v-if="coffeeItem.constructor === Object" class="coffee-picture-info-wrap">
          </div>
          <div v-else class="coffee-picture-info-wrap no-padding">
            <ion-skeleton-text animated></ion-skeleton-text>
          </div>
        </div>

        <div v-if="coffeeItem.constructor === Object" class="coffee-info-container">
          <p v-if="coffeeItem.product_description" class="">{{ coffeeItem.product_description }}</p>
          <p v-else class=""><i>Описание отсутствует</i></p>
        </div>
        <div v-else class="coffee-info-container">
          <ion-skeleton-text animated></ion-skeleton-text>
        </div>

        <div v-if="coffeeItem.options && coffeeItem.options.length > 0" class="coffee-modifiers-container">
          <ion-list v-for="groups in coffeeItem.options" :key="groups.id">
            <ion-radio-group @ionChange="setRadioOption" name="options" :allow-empty-selection="groups.min_amount === 1 || groups.required ? `false` : `true`" v-if="groups.max_amount === 1" :value="groups.min_amount === 1 || groups.required ? groups.values[0].id : ``">
              <input @change="calculatePrice" type="hidden" name="options" :value="groups.min_amount === 1 || groups.required ? groups.values[0].id : ``">
              <h3>{{ groups.name }}</h3>
              <ion-item lines="none" v-for="option in groups.values" :key="option.id">
                <ion-radio :value="option.id" slot="start"></ion-radio>
                <ion-label class="option-label"><span>{{ option.name }}</span><span v-if="option.price > 0">{{ option.price }} руб.</span></ion-label>
              </ion-item>
            </ion-radio-group>
            <div v-else-if="groups.max_amount > 1" class="checkbox-wrap">
              <h3>{{ groups.name }}</h3>
              <ion-item lines="none" v-for="option in groups.values" :key="option.id">
                <ion-checkbox @ionChange="calculatePrice" name="options" :value="option.id" slot="start" :checked="(groups.min_amount === 1 || groups.required) && groups.values[0] === option ? `true` : `false`"></ion-checkbox>
                <ion-label>{{ option.name }}</ion-label>
                <ion-note v-if="option.price > 0" slot="end">{{ option.price }} руб.</ion-note>
                <ion-note v-else slot="end">&nbsp;</ion-note>
              </ion-item>
            </div>
          </ion-list>
        </div>
        <div v-else-if="coffeeItem.constructor !== Object" class="coffee-modifiers-container">
          <ion-list>
            <div class="checkbox-wrap">
              <h3><ion-skeleton-text animated></ion-skeleton-text></h3>
              <ion-item lines="none">
                <ion-checkbox slot="start" disabled="true"></ion-checkbox>
                <ion-label><ion-skeleton-text animated></ion-skeleton-text></ion-label>
              </ion-item>
              <ion-item lines="none">
                <ion-checkbox slot="start" disabled="true"></ion-checkbox>
                <ion-label><ion-skeleton-text animated></ion-skeleton-text></ion-label>
              </ion-item>
              <ion-item lines="none">
                <ion-checkbox slot="start" disabled="true"></ion-checkbox>
                <ion-label><ion-skeleton-text animated></ion-skeleton-text></ion-label>
              </ion-item>
              <ion-item lines="none">
                <ion-checkbox slot="start" disabled="true"></ion-checkbox>
                <ion-label><ion-skeleton-text animated></ion-skeleton-text></ion-label>
              </ion-item>
            </div>
          </ion-list>
        </div>

        <div v-if="coffeeItem.energyAmount !== 'NaN' && coffeeItem.proteinsAmount !== 'NaN' && coffeeItem.fatAmount !== 'NaN' && coffeeItem.carbohydratesAmount !== 'NaN'" class="coffee-calorific-info-container">
          <h3>Калорийность "{{ coffeeItem.product_name }}"</h3>
          <div class="wrap">
            <div class="item">
              <div class="value">{{ coffeeItem.energyAmount && coffeeItem.energyAmount !== 'NaN' ? coffeeItem.energyAmount : 0 }}</div>
              <div class="label">Ккал</div>
            </div>
            <div class="item">
              <div class="value">{{ coffeeItem.proteinsAmount && coffeeItem.proteinsAmount !== 'NaN' ? coffeeItem.proteinsAmount : 0 }}</div>
              <div class="label">Белки, г</div>
            </div>
            <div class="item">
              <div class="value">{{ coffeeItem.fatAmount && coffeeItem.fatAmount !== 'NaN' ? coffeeItem.fatAmount : 0 }}</div>
              <div class="label">Жиры, г</div>
            </div>
            <div class="item">
              <div class="value">{{ coffeeItem.carbohydratesAmount && coffeeItem.carbohydratesAmount !== 'NaN' ? coffeeItem.carbohydratesAmount : 0 }}</div>
              <div class="label">Углеводы, г</div>
            </div>
          </div>
        </div>
      </form>
    </ion-content>
    <ion-footer>
      <ion-toolbar class="overview-footer" color="light">
        <ion-button :disabled="coffeeItem && useCart && coffeeItem.price > 0 ? `false` : `true`" @click="addToCart" expand="block" type="submit" color="primary">
          <div class="content">
            <span><ion-icon :icon="cartOutline"></ion-icon>Заказать</span>
            <span>{{ calcPrice }} руб.</span>
          </div>
        </ion-button>
        <ion-buttons slot="end">
          <ion-button @click="toggleFavorite">
            <ion-icon :icon="isFavorite ? heart : heartOutline" class="favorite-icon"></ion-icon>
          </ion-button>

        </ion-buttons>
      </ion-toolbar>

    </ion-footer>
  </ion-page>
</template>
<style>
.favorite-icon {
  font-size: 24px;
  transition: color 0.3s ease;
}


</style>
<script>
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonBackButton, IonButtons, IonFooter, IonIcon, IonButton, toastController, IonRadioGroup, IonRadio, IonCheckbox, IonLabel, IonNote, IonList, IonItem, IonSkeletonText } from '@ionic/vue';
import { chevronBack, cartOutline } from 'ionicons/icons';
// import CoffeeOverview from '../components/coffee/CoffeeOverview.vue';
import { useRouter } from 'vue-router';
import { heart, heartOutline } from 'ionicons/icons';

export default {
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonToolbar,
    IonButtons,
    IonBackButton,
    // CoffeeOverview,
    IonFooter,
    IonIcon,
    IonButton,
    IonRadioGroup,
    IonRadio,
    IonCheckbox,
    IonLabel,
    IonNote,
    IonList,
    IonItem,
    IonSkeletonText
  },
  data() {
    return {
      isFavoriteLocal: false, // Статус избранного
      productId: this.$route.params.id,
      calcPrice: 0,
      useCart: true,
    }
  },
  setup() {
    const router = useRouter();
    return {
      router,
      chevronBack,
      cartOutline,
      heart,
      heartOutline
    }
  },

  async ionViewWillEnter() {
    this.$store.commit('clearState', 'product');
    this.useCart = true;
    const response = this.$store.dispatch('getProduct', {params: {id: this.productId}});

    if(response) {
      // All good
    } else {
      // Not good
    }
  },
  computed: {
    coffeeItem() {

      var product = this.$store.getters.product;
      if(product) {
        product.carbohydratesAmount = parseFloat(product.carbohydratesAmount).toFixed(1);
        product.energyAmount = parseFloat(product.energyAmount).toFixed(1);
        product.fatAmount = parseFloat(product.fatAmount).toFixed(1);
        product.proteinsAmount = parseFloat(product.proteinsAmount).toFixed(1);
      }

      return product;
    },
    isFavorite() {
      return this.$store.getters.isFavorite(this.coffeeItem.id); // Проверяем, является ли товар избранным
    }
  },

  watch: {
    coffeeItem(val) {
      if(val !== false && val !== undefined) this.calculatePrice();
    }
  },
  methods: {
    async addToCart() {
      // e.preventDefault();
      this.useCart = false;
      var params = {};
      const form = document.getElementById('coffee-detail');
      const formData = new FormData(form);
      const toast = await toastController.create({
        message: 'Товар добавлен в корзину',
        position: 'bottom',
        cssClass: 'toast-mb',
        mode: 'md',
        duration: 1000
      });

      for(var pair of formData.entries()) {
        if(pair[1] == '') continue;

        if(params[pair[0]] !== undefined) {
          if(typeof params[pair[0]] === 'string') {
            params[pair[0]] = [params[pair[0]], pair[1]];
          } else {
            params[pair[0]].push(pair[1]);
          }
        } else {
          params[pair[0]] = [pair[1]];
        }
      }

      this.$store.dispatch('addToCart', params);
      await toast.present();
      this.router.go(-1); // Might need to check if previous page is equal to '/coffee' (TODO)
    },
    async toggleFavorite() {
      const product = this.$store.getters.product;

      if (this.$store.getters.isFavorite(product.id)) {
        // Удаляем из избранного
        this.$store.commit('removeFavorite', product.id);
        const toast = await toastController.create({
          message: 'Удалено из избранного',
          position: 'bottom',
          cssClass: 'toast-mb',
          mode: 'md',
          duration: 1000,
          color: 'danger'
        });
        await toast.present();
      } else {
        // Добавляем в избранное
        this.$store.commit('addFavorite', product);
        const toast = await toastController.create({
          message: 'Добавлено в избранное',
          position: 'bottom',
          cssClass: 'toast-mb',
          mode: 'md',
          duration: 1000,
          color: 'success'
        });
        await toast.present();
      }
    },

    setRadioOption(e) {
      const radioGroup = e.target;
      const hiddenInput = radioGroup.querySelector('input[name="'+radioGroup.name+'"]');

      hiddenInput.value = typeof radioGroup.value === 'undefined' ? '' : radioGroup.value;

      if ("createEvent" in document) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        hiddenInput.dispatchEvent(evt);
      } else {
        hiddenInput.fireEvent("onchange");
      }
    },
    calculatePrice() {
      const that = this;
      setTimeout(function() {
        // var params = {};
        var calcPrice = that.coffeeItem.price;
        const form = document.getElementById('coffee-detail');
        const formData = new FormData(form);

        for(var pair of formData.entries()) {
          if(pair[1] == '' || pair[0] != 'options') continue;

          let group = that.coffeeItem.options.find(group => {
            return group.values.some(modifier => {
              return modifier.id == pair[1];
            });
          });

          let option = group.values.find(modifier => {
            return modifier.id == pair[1];
          });

          calcPrice += option.price || 0;
        }

        that.calcPrice = calcPrice;
      }, 100);
    }
  }
}
</script>
