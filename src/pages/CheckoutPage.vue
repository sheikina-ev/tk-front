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
        <ion-radio-group v-model="checkedTime" name="timeuse" value="fast">
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
import { alertController, modalController, toastController } from '@ionic/vue';
import BaseLayout from "@/components/base/BaseLayout.vue";
import AppFooter from "@/components/base/AppFooter.vue";
import { useRouter } from "vue-router";
import ModalPl from "@/components/misc/ModalPl.vue";

export default {
  components: {
    AppFooter,
    BaseLayout,
  },
  data() {
    return {
      bonusPoints: '',
      checkedTime: 'fast',
      dataTime: '--:--',
    };
  },
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
  async ionViewDidEnter() {
    var today = new Date();
    var hour = today.getHours();
    today.setHours(hour + 1);
    var later = today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    this.dataTime = later;
    console.log(later);
  },
  computed: {
    activeShop() {
      const activeShop = this.$store.getters.activeShop;
      const shops = this.$store.getters.shops;
      if (!activeShop || shops.length <= 0) this.$store.dispatch('getStores', { setActiveShop: true });
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

      if (this.isAuthorized && bonus !== '') return bonus;
      else if (this.isAuthorized && !bonus !== '') {
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
    async submitOrder(e) {
      e.preventDefault();

      const formData = new FormData(e.target);

      try {
        const response = await this.$store.dispatch('sendOrder', { order: Object.fromEntries(formData) });

        if (response && response.status === "Success") {
          const orderId = response.data.orderId;
          this.$router.push({ name: 'OrderSuccess', params: { orderId: orderId } });
        } else {
          throw new Error('Не удалось оформить заказ. Получен неправильный ответ от сервера.');
        }
      } catch (error) {
        console.error('Ошибка при отправке заказа:', error);
        this.throwToast('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз позже.');
      }
    },
    async openModal(code) {
      const modal = await modalController.create({
        component: ModalPl,
        cssClass: 'my-custom-modal',
        componentProps: {
          code: code,
        },
      });

      return modal.present();
    },

    async changePhoneNumber() {
      const alert = await alertController.create({
        header: 'Изменить номер',
        message: 'Обратите внимание: если вы измените номер телефона, то корзина будет очищена и баланс баллов изменится',
        buttons: [
          {
            text: 'Отмена',
            role: 'cancel',
          },
          {
            text: 'OK',
            handler: () => {
              this.$store.dispatch('logout');
              this.bonusPoints = 0;
            },
          },
        ],
      });

      await alert.present();
    },

    async requestConfirmationCode() {
      const checkoutForm = document.getElementById('checkout-form');
      const formData = new FormData(checkoutForm);

      // Отправка запроса на подтверждение кода
      const response = await this.$store.dispatch('requestConfirmationCode', { params: { phone: formData.get('phone') } });

      if (response) {
        this.showConfirmationPrompt();
      } else {
        this.throwToast('Не удалось отправить код подтверждения');
      }
    },

    async showConfirmationPrompt() {
      const alert = await alertController.create({
        cssClass: 'auth-code-prompt',
        header: 'Подтверждение',
        message: 'Введите код из SMS',
        backdropDismiss: false,
        inputs: [
          {
            name: 'code',
            placeholder: '1234',
            type: 'number',
            attributes: {
              maxlength: 4,
              inputmode: 'numeric',
              enterkeyhint: 'done',
            },
          },
        ],
        buttons: [
          {
            text: 'Отмена',
            role: 'cancel',
          },
          {
            text: 'Отправить',
            handler: (fields) => {
              this.sendConfirmationCode(fields.code);
            },
          },
        ],
      });

      await alert.present();
    },

    async sendConfirmationCode(code) {
      const response = await this.$store.dispatch('sendConfirmationCode', { params: { phone: this.user.phone, code: code } });

      if (response) {
        this.throwToast('Телефон подтвержден');
      } else {
        this.throwToast('Неверный код подтверждения');
      }
    },

    async throwToast(message) {
      const toast = await toastController.create({
        message: message,
        position: 'bottom',
        cssClass: 'toast-mb',
        mode: 'md',
        duration: 3000,
      });

      toast.present();
    },

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

      for (var i = 0; i < pattern.length; i++) {
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

      if (formatted.length > 0) {
        formatted = '7' + formatted.substring(1);
      }

      return formatted;
    }
  },
};
</script>
