<template>
  <base-layout page-title="Оформить заказ">
    <div class="checkout-page lg:ml-80 px-4 lg:px-0">
      <h1 class="checkout-header mt-10 mb-16 font-bold text-lg lg:text-xl">Оформление заказа</h1>

      <form v-if="cart.length > 0" id="checkout-form" @submit.prevent="submitOrder">
        <label for="name" class="text-black">Имя*</label>
        <div class="checkout-page-input mb-5">
          <input
              id="name"
              placeholder="Ваше имя"
              name="name"
              type="text"
              autocomplete="name"
              required
              :value="user && user.name"
              class="bg-white w-full lg:w-520 h-10 text-sm font-bold border border-black pl-3"
          />
        </div>

        <label for="phone">Телефон*</label>
        <div class="checkout-page-input mb-5">
          <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="79998887766"
              autocomplete="tel"
              required
              :value="user && user.phone"
              class="bg-white w-full lg:w-520 h-10 text-sm font-bold border border-black pl-3"
          />
        </div>
        <button
            type="button"
            class="request mt-6 mb-10 w-48 h-9 rounded-full bg-custom-color text-sm font-medium border border-black"
            @click="requestConfirmationCode" style="border: 1px solid black"
        >
          Подтвердить номер
        </button>
        <div class="checkout-page-select mb-10">
          <label for="selectedAddress">Выбранный адрес</label>
          <h1 id="address" class="address text-black font-bold">{{ activeShop.store_name }}</h1>
          <input type="hidden" name="terminalGroupId" :value="activeShop.guid" />
        </div>

        <ion-label class="checkout-page-label" position="stacked">Выберите время доставки</ion-label>
        <ion-radio-group v-model="checkedTime" name="timeuse">
          <ion-item lines="none">
            <ion-label><span>Как можно скорее</span></ion-label>
            <ion-radio slot="start" name="fast" value="fast"></ion-radio>
          </ion-item>
          <ion-item lines="none">
            <ion-label><span>К определенному времени</span></ion-label>
            <ion-radio slot="start" name="time" value="time"></ion-radio>
          </ion-item>
        </ion-radio-group>
        <ion-item v-if="checkedTime === 'time'" lines="none" class="checkout-page-input">
          <ion-label>Укажите время доставки</ion-label>
          <ion-datetime display-format="HH:mm" name="time-full" v-model="dataTime" cancel-text="Отменить" done-text="Принять" placeholder="--:--"></ion-datetime>
        </ion-item>

        <div class="order-total-wrap mt-12 text-lg">
          <b>Итого</b>
        </div>
        <div class="mb-5">
          <b>{{ cartTotal ? cartTotal + ' руб.' : '0 руб.' }}</b>
        </div>

        <button
            class="btn-classic checkout-page-btn w-36 h-9 rounded-full bg-custom-color text-sm font-medium border border-black"
            type="submit"  style="border: 1px solid black"
        >
          Оформить заказ
        </button>
        <div class="bottom-link-wrap flex justify-start">
          <a @click="openModal('policy')" class="primary dark">Условия использования и персональные данные</a>
        </div>
      </form>

      <div class="center-content" v-else>
        <h2 class="text-center">Корзина пуста</h2>
      </div>
    </div>
    <AppFooter></AppFooter>
  </base-layout>
</template>


<script>
import {
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonDatetime,
  alertController,
  modalController,
  toastController
} from '@ionic/vue';
import AppFooter from "@/components/base/AppFooter.vue";
import CheckoutModal from '../components/misc/CheckoutModal.vue';
import BaseLayout from "@/components/base/BaseLayout.vue";


export default {
  components: {
    BaseLayout,
    IonItem,
    IonLabel,
    IonRadioGroup,
    IonRadio,
    IonDatetime,
    AppFooter
  },
  data() {
    return {
      bonusPoints: '',
      checkedTime: 'fast',
      dataTime: '--:--',

    }
  },
  computed: {
    activeShop() {
      const activeShop = this.$store.getters.activeShop;
      const shops = this.$store.getters.shops;
      if (!activeShop || shops.length <= 0) {
        this.$store.dispatch('getStores', { setActiveShop: true });
      }
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

      if (this.isAuthorized && bonus !== '') {
        return bonus;
      } else if (this.isAuthorized && !bonus !== '') {
        this.$store.dispatch('getBonuses', this.user.phone);
        return bonus;
      }

      return false;
    }
  },
  async ionViewDidEnter() {
    var today = new Date();
    var hour = today.getHours();
    today.setHours(hour + 1);
    var later = today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    this.dataTime = later;
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

      await alert.present();
    },
    async submitOrder(event, isTest = false) {
      event.preventDefault();

      if (!this.isNameFilled || !this.isPhoneFilled) {
        this.throwToast('Заполните обязательные поля: Имя и Телефон');
        return;
      }

      let items = JSON.parse(JSON.stringify(this.cart));
      let orderFields = {};
      const formData = new FormData(event.target);

      for (let key of formData.keys()) {
        orderFields[key] = formData.get(key);
      }

      let timeDelivery = null;
      if (this.dataTime) {
        timeDelivery = this.dataTime;
      }

      orderFields = {
        terminalGroupId: orderFields.terminalGroupId,
        phone: orderFields.phone,
        items: items,
        customer: {
          name: orderFields.name
        },
        time_delivery: timeDelivery,
        cash: this.cartTotal - (parseFloat(orderFields.bonus) || 0),
        bonus: parseFloat(orderFields.bonus) || 0
      };

      var today = new Date();
      var hour = today.getHours();
      today.setHours(hour + 1);
      var later = today.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
      var timeFrom = this.activeShop.time_from;
      var timeTo = this.activeShop.time_to;

      if (this.checkedTime === 'time') {
        if (this.dataTime + ':00' < timeFrom) {
          this.throwToast('Время заказа из данной точки начинается с ' + timeFrom);
          return;
        }
        if (later > this.dataTime) {
          this.throwToast('Время заказа должно быть выбрано минимум за час с начала заказа.');
          return;
        }
        if (this.dataTime + ':00' > timeTo) {
          this.throwToast('Время заказа из данной точки доступно до ' + timeTo);
          return;
        }
      }

      if (isTest) {
        console.log(this.cartTotal);
        console.log(this.dataTime);
        console.log(orderFields.bonus);
        this.throwToast('[DEV] Заказ успешно оформлен');
        console.log(JSON.stringify(orderFields));
        console.log(orderFields);
        return;
      }

      const response = await this.$store.dispatch('sendOrder', {order: orderFields});

      var orderId = 0;
      console.log(response.errorMessage);
      if (!response) {
        this.throwToast('Возникла непредвиденная ошибка');
      } else if (response.status == "Error") {
        this.throwToast('Ошибка: ' + response.message + response.errorMessage);
      } else if (response.errorMessage == 'Доступ запрещён') {
        this.throwToast('Ошибка: ' + response.errorMessage);
      } else {
        if (response.data.link !== undefined) {
          orderId = response.data.orderId;
          const modal = await modalController.create({
            component: CheckoutModal,
            componentProps: {
              title: 'Оплата',
              src: response.data.link
            }
          });

          await modal.present();

          modal.onDidDismiss().then((data) => {
            if (data.data.isPaymentSuccessful !== undefined) {
              this.router.push({
                name: 'Result',
                query: (data.data.isPaymentSuccessful ? {response, orderId: orderId} : {orderId: orderId})
              });
            }
          });
        }
        await this.router.push({name: 'Result', query: {response, orderId: orderId}});
      }
    },
    async authorize(params) {
      const response = await this.$store.dispatch('login', {params: params});

      if (response) {
        this.throwToast(response.message === 'Sign-up' ? 'Регистрация выполнена успешно' : 'С возвращением!');
      } else {
        this.throwToast('Ошибка подтверждения номера');
      }
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

      await alert.present();
    },
    async sendConfirmationCode(params) {
      const response = await this.$store.dispatch('sendConfirmationCode', {
        params: {
          phone: params.phone,
          code: params.code
        }
      });
      if (response) {
        this.authorize(params);
      } else {
        this.showConfirmationPrompt(params, true);
      }
    },
    async requestConfirmationCode() {
      const checkoutForm = document.getElementById('checkout-form');
      const formData = new FormData(checkoutForm);
      let formFields = {};

      for (let key of formData.keys()) {
        formFields[key] = formData.get(key).trim();
      }

      if (formFields['name'].length > 0 && formFields['phone'].length > 0) {
        const response = await this.$store.dispatch('requestConfirmationCode', {params: {phone: formFields.phone}});
        if (response) {
          this.showConfirmationPrompt(formFields);
        } else {
          this.throwToast('Не удалось отправить код подтверждения');
        }
      } else {
        this.throwToast('Заполните обязательные поля: Имя и Телефон');
      }
    },
    throwToast(message) {
      toastController.create({
        message: message,
        duration: 3000,
        color: 'danger'
      }).then(toast => {
        toast.present();
      });
    },
    async openModal(type) {
      if (type === 'policy') {
        const modal = await modalController.create({
          component: CheckoutModal,
          componentProps: {
            title: 'Условия использования и персональные данные'
          }
        });
        await modal.present();
      }
    }
  }
};
</script>


