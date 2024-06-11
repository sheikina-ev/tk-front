<template>
  <base-layout page-title="Оформить заказ">
    <form v-if="cart.length > 0" id="checkout-form" @submit="submitOrder">
      <ion-item lines="none" class="checkout-page-input">
        <ion-label position="stacked">Имя*</ion-label>
        <ion-input name="name" autocomplete="name" required="true" :value="user && user.name"></ion-input>
      </ion-item>
      <ion-item lines="none" class="checkout-page-input">
        <ion-label position="stacked">Телефон*</ion-label>
        <ion-input name="phone" placeholder="79998887766" autocomplete="tel" type="tel" required="true" :value="user && user.phone"></ion-input>
        <ion-button fill="clear" @click="requestConfirmationCode">Подтвердить номер</ion-button>
      </ion-item>
      <ion-item lines="none" class="checkout-page-select">
        <ion-label position="stacked">Выбранный адрес</ion-label>
        <ion-input disabled="true" :value="activeShop.store_name"></ion-input>
        <input type="hidden" name="terminalGroupId" :value="activeShop.guid" />
      </ion-item>
      <ion-item lines="none" class="checkout-page-input">
        <ion-label class="checkout-page-label" position="stacked">Выберете время доставки</ion-label>
        <ion-radio-group v-model='checkedTime' name="timeuse" value="fast">
          <ion-item lines="none">
            <ion-label><span>Как можно скорее</span></ion-label>
            <ion-radio slot="start" name="fast" value="fast"></ion-radio>
          </ion-item>
          <ion-item lines="none">
            <ion-label><span>К определенному времени</span></ion-label>
            <ion-radio slot="start" name="time" value="time"></ion-radio>
          </ion-item>
        </ion-radio-group>
      </ion-item>
      <ion-item v-if="checkedTime === 'time'" lines="none" class="checkout-page-input">
        <ion-label>Укажите время доставки</ion-label>
        <ion-datetime display-format="HH:mm" name="time-full" v-model="dataTime" cancel-text="Отменить" done-text="Принять" placeholder="--:--"></ion-datetime>
      </ion-item>
      <div class="order-total-wrap">
        <b>Итого:</b>
        <b>{{ cartTotal }} руб.</b>
      </div>
      <ion-button expand="block btn-classic checkout-page-btn" type="submit">Оформить заказ</ion-button>
    </form>
    <div class="center-content" v-else>
      <h2 class="text-center">Корзина пуста</h2>
    </div>
  </base-layout>
</template>

<script>
import { IonItem, IonLabel, IonInput, IonRadioGroup, IonRadio, IonButton, IonDatetime, alertController, toastController, modalController } from '@ionic/vue';
import Modal from '../components/misc/Modal.vue';
import { useRouter } from 'vue-router';
import CheckoutModal from '../components/misc/CheckoutModal.vue';

export default {
  components: {
    IonItem,
    IonLabel,
    IonInput,
    IonRadioGroup,
    IonRadio,
    IonButton,
    IonDatetime
  },
  data() {
    return {
      bonusPoints: '',
      checkedTime: 'fast',
      dataTime: '--:--',
    }
  },
  setup() {
    const router = useRouter();
    return {
      router
    };
  },
  async ionViewDidEnter() {
    var today = new Date();
    var hour = today.getHours();
    today.setHours(hour+1);
    var later = today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    this.dataTime = later;
    console.log(later);
  },
  computed: {
    activeShop() {
      const activeShop = this.$store.getters.activeShop;
      const shops = this.$store.getters.shops;
      if(!activeShop || shops.length <= 0) this.$store.dispatch('getStores', {setActiveShop: true});
      return this.$store.getters.activeShop;
    },
    cart() {
      return this.$store.getters.cart;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    },
    user() {
      return this.$store.getters.user;
    },
    isAuthorized() {
      return this.$store.getters.isAuthorized;
    },
    bonus() {
      let bonus = this.$store.getters.bonus;

      if(this.isAuthorized && bonus !== '') return bonus;
      else if(this.isAuthorized && !bonus !== '') {
        this.$store.dispatch('getBonuses', this.user.phone);
        return bonus;
      }

      return false;
    }
  },
  unmounted() {
    // this.$store.commit('clearState', 'bonus');
  },
  methods: {
    async changePhoneNumber() {
      const alert = await alertController.create({
        header: 'Изменить номер',
        message: 'Обратите внимание: если вы измените номер телефона, то корзина будет очищена и баланс баллов изменится',
        buttons: [
          {
            text: 'Отмена',
            role: 'cancel'
          },
          {
            text: 'OK',
            handler: () => {
              this.$store.dispatch('logout');
              this.bonusPoints = 0;
            }
          }
        ]
      });

      return alert.present();
    },
    async submitOrder(e, isTest = false) {
      e.preventDefault();
      let items = JSON.parse(JSON.stringify(this.cart));
      let orderFields = {};
      let formFields = {};
      const formData = new FormData(e.target);

      for(var key of formData.keys()) {
        formFields[key] = formData.get(key);
      }

      // Filter item fields
      let itemsFilter = ['type', 'productId', 'amount', 'modifiers', 'name', 'price'];
      let modifiersFilter = ['productId', 'amount', 'productGroupId', 'name'];
      items.forEach(function(item, index) {
        this[index] = Object.keys(item).filter(key => itemsFilter.includes(key)).reduce((obj, key) => {
          obj[key] = item[key];
          return obj;
        }, {});

        if(item.modifiers !== undefined && item.modifiers.length > 0) item.modifiers.forEach(function(modifier, index) {
          this[index] = Object.keys(modifier).filter(key => modifiersFilter.includes(key)).reduce((obj, key) => {
            obj[key] = modifier[key];
            return obj;
          }, {});
        }, item.modifiers);
      }, items);

      var timeDelivry = null;
      if (this.dataTime){
        timeDelivry = this.dataTime;
      }

      orderFields = {
        terminalGroupId: formFields.terminalGroupId,
        phone: formFields.phone,
        items: items,
        customer: {
          name: formFields.name
        },
        time_delivery: timeDelivry,
        cash: this.cartTotal - (parseFloat(formFields.bonus) || 0),
        bonus: parseFloat(formFields.bonus) || 0
      };
      var today = new Date();
      var hour = today.getHours();
      today.setHours(hour+1);
      var later = today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      var time_from = this.activeShop.time_from;
      var time_to = this.activeShop.time_to;

      if (this.checkedTime === 'time'){
        if (this.dataTime + ':00' < time_from){
          this.throwToast('Время заказ из данной точки начинается с ' + time_from);
          return
        }
        if (later > this.dataTime){
          this.throwToast('Время заказ должно быть выбрано минимум за час с начала заказа.');
          return
        }
        if (this.dataTime + ':00' > time_to){
          this.throwToast('Время заказ из данной точки доступно до ' + time_to);
          return
        }
      }


      if(isTest) {
        console.log(this.cartTotal);
        console.log(this.dataTime);
        console.log(formFields.bonus);
        this.throwToast('[DEV] Заказ успешно оформлен');
        console.log(JSON.stringify(orderFields));
        console.log(formFields);
        return
      }

      const response = await this.$store.dispatch('sendOrder', {order: orderFields});

      var orderId = 0;
      console.log(response.errorMessage);
      if(!response) {
        this.throwToast('Возникла непредвиденная ошибка');
      } else if(response.status == "Error") {
        this.throwToast('Ошибка: ' + response.message + response.errorMessage);
      } else if(response.errorMessage == 'Доступ запрещён') {
        this.throwToast('Ошибка: ' + response.errorMessage);
      } else {
        if(response.data.link !== undefined) {
          orderId = response.data.orderId;
          const modal = await modalController.create({
            component: CheckoutModal,
            componentProps: {
              title: 'Оплата',
              src: response.data.link // Ссылка на платёжный шлюз
            }
          });

          await modal.present();

          modal.onDidDismiss().then((data) => { // data - объект данных, переданных методом dismiss() из компонента CheckoutModal.vue
            if(data.data.isPaymentSuccessful !== undefined) {
              // TODO: переадресовать пользователя на результирующую страницу с сообщением, соответствующим статусу проведения платежа
              this.router.push({name: 'Result', query: (data.data.isPaymentSuccessful ? {response, orderId: orderId} : {orderId: orderId})});
            }
          });
        }
        await this.router.push({name: 'Result', query: {response, orderId: orderId}});
      }
    },
    async requestConfirmationCode() {
      const checkoutForm = document.getElementById('checkout-form');
      const formData = new FormData(checkoutForm);
      let formFields = {};

      for(var key of formData.keys()) {
        formFields[key] = formData.get(key).trim();
      }

      if(formFields['name'].length > 0 && formFields['phone'].length > 0) {
        const response = await this.$store.dispatch('requestConfirmationCode', {params: {phone: formFields.phone}});
        if(response) {
          this.showConfirmationPrompt(formFields);
        } else {
          this.throwToast('Не удалось отправить код подтверждения');
        }
      } else {
        if(formFields['name'].length <= 0 && formFields['phone'].length <= 0) this.throwToast('Заполните поля "Имя" и "Телефон"');
        else if(formFields['name'].length <= 0) this.throwToast('Заполните поле "Имя"');
        else if(formFields['phone'].length <= 0) this.throwToast('Заполните поле "Телефон"');
      }
    },
    async throwToast(message) {
      const toast = await toastController.create({
        message: message,
        position: 'bottom',
        cssClass: 'toast-mb',
        mode: 'md',
        duration: 3000
      });

      toast.present();
    },
    async showConfirmationPrompt(params, hasError = false) {
      const alert = await alertController.create({
        cssClass: 'auth-code-prompt',
        header: 'Подтверждение',
        subHeader: hasError ? 'Код неверен' : '',
        message: 'Введите код из SMS',
        backdropDismiss: false,
        inputs: [
          {
            name: 'name',
            type: 'text',
            cssClass: 'hidden',
            value: params.name
          },
          {
            name: 'phone',
            type: 'phone',
            cssClass: 'hidden',
            value: params.phone
          },
          {
            name: 'code',
            placeholder: '1234',
            type: 'number',
            attributes: {
              maxlength: 4,
              inputmode: 'numeric',
              enterkeyhint: 'done'
            }
          }
        ],
        buttons: [
          {
            text: 'Отмена',
            role: 'cancel'
          },
          {
            text: 'Отправить',
            handler: (fields) => {
              this.sendConfirmationCode(fields);
            }
          }
        ]
      });

      return alert.present();
    },
    async sendConfirmationCode(params) {
      const response = await this.$store.dispatch('sendConfirmationCode', {params: {phone: params.phone, code: params.code}});
      if(response) {
        this.throwToast('Телефон подтвержден');
      } else {
        this.showConfirmationPrompt(params, true);
      }
    },
    // Bonus validation
    validateBonusField(e) {
      const bonus = parseInt(this.bonus);
      const sum = (this.cartTotal - 1); // Preventing customer from paying full sum with bonus points
      if(e.target.value > bonus || e.target.value > sum) {
        if(e.target.value > sum) {
          e.target.value = sum;
        } else if(e.target.value > bonus) {
          e.target.value = bonus;
        }
        // e.target.value = (e.target.value > sum ? sum : (e.target.value > bonus ? bonus : e.target.value));
      }
    },
    async openModal(code) {
      const modal = await modalController.create({
        component: Modal,
        cssClass: 'my-custom-modal',
        componentProps: {
          code: code
        }
      });

      return modal.present();
    },
    // Phone mask
    format(e) {
      const elem = e.target;
      const val = this.doFormat(elem.value, "***********");
      elem.value = val;
    },
    doFormat(x, pattern) {
      var strippedValue = x.replace(/[^0-9]/g, "");
      var chars = strippedValue.split('');
      var count = 0;

      var formatted = '';
      for (var i=0; i<pattern.length; i++) {
        const c = pattern[i];
        if (chars[count]) {
          if (/\*/.test(c)) {
            formatted += chars[count];
            count++;
          } else {
            formatted += c;
          }
        }
      }

      if(formatted.length > 0) {
        formatted = '7' + formatted.substring(1);
      }
      return formatted;
    }
  }
}
</script>
