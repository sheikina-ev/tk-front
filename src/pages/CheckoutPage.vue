<template>
  <base-layout page-title="Оформить заказ">
    <div class="checkout-page ml-80">
      <h1 class="checkout-header mt-10 mb-16" style="font-weight: 700; font-size: 18px">Оформление заказа</h1>
      <form v-if="cart.length > 0" id="checkout-form" @submit="submitOrder">
        <label for="name">Имя*</label>
        <div class="checkout-page-input" style="margin-bottom: 20px;">
          <input type="text" id="name" name="name" placeholder="Мария" style="padding-left: 12px" autocomplete="name" :value="user && Object.keys(user).length !== 0 ? user.name : ''" required>
        </div>
        <label for="phone">Телефон*</label>
        <div class="checkout-page-input">
          <input type="tel" id="phone" name="phone" placeholder="79618765364" style="padding-left: 12px" autocomplete="tel" :disabled="isAuthorized && user && Object.keys(user).length !== 0" :value="isAuthorized && user && Object.keys(user).length !== 0 ? user.phone : ''" required>
          <button v-if="isAuthorized" @click="changePhoneNumber">Изменить номер</button>
          <div class="mt-6 full-width">
            <button v-if="!isAuthorized" type="button" @click="requestConfirmationCode">Подтвердить номер</button>
          </div>
        </div>

        <div class="checkout-page-select mb-10" style="margin-top: 44px;"> <!-- Добавлен отступ 44px -->
          <label for="address">Выбранный адрес</label>
          <h1 id="address" class="address text-black" style="font-weight: 700;">{{ activeShop.store_name }}</h1>
          <input type="hidden" name="terminalGroupId" :value="activeShop.guid">
        </div>

        <div class="checkout-page-input d-none" style="margin-top: 44px;"> <!-- Добавлен отступ 44px -->
          <label v-if="bonus !== '' && bonus !== false" class="checkout-page-total">Мои баллы: <b>{{ bonus }}</b></label>
          <label v-else class="checkout-page-total">Мои баллы: <b>Необходимо подтвердить номер</b></label>
          <label for="bonus">Списать баллов</label>
          <input type="number" id="bonus" name="bonus" :disabled="!bonus" v-model="bonusPoints" @change="validateBonusField">
        </div>

        <div class="checkout-page-input">
          <label class="checkout-page-label">Выберете время доставки</label>
          <div class="radio-options">
            <div>
              <input type="radio" id="fast" name="timeuse" value="fast" v-model="checkedTime">
              <label for="fast">Как можно скорее</label>
            </div>
            <div>
              <input type="radio" id="time" name="timeuse" value="time" v-model="checkedTime">
              <label for="time">К определенному времени</label>
              <ion-datetime v-if="checkedTime === 'time'" display-format="HH:mm" name="time-full" v-model="dataTime" cancel-text="Отменить" done-text="Принять" placeholder="--:--"></ion-datetime>
            </div>
          </div>
        </div>



        <div class="order-total-wrap">
          <b>Итого:</b>
          <div style="margin-top: 34px; margin-left: -70px;	font-weight: 600;"> <!-- Добавлено стилизованное блок-обертка для цены -->
            <b>{{ cartTotal ? cartTotal + ' руб.' : '0 руб.' }}</b>
          </div>
        </div>


        <div v-if="bonusPoints > 0" class="order-total-wrap">
          <b>К оплате:</b>
          <b>{{ cartTotal - bonusPoints }} руб.</b>
        </div>

        <button class="btn-classic checkout-page-btn" type="submit" >Оформить заказ</button>

        <div class="bottom-link-wrap flex-center">
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
import {  alertController, toastController, modalController } from '@ionic/vue';
import Modal from '../components/misc/Modal.vue';
import { useRouter } from 'vue-router';
import CheckoutModal from '../components/misc/CheckoutModal.vue';
import BaseLayout from "@/components/base/BaseLayout.vue";
import AppFooter from "@/components/base/AppFooter.vue";

export default {
  components: {
    AppFooter,
    BaseLayout

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

      // Log formFields to debug issue
      console.log('Form Fields:', formFields);

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
        let arr = this.dataTime.split(":");
        var hour = arr[0];
        var min = arr[1];
        var date = new Date();
        var curr_hour = date.getHours();
        var curr_min = date.getMinutes();
        if((hour >= curr_hour) && (min > curr_min)) timeDelivry = this.dataTime;
        else {
          await this.presentToast("Указанное время не может быть меньше текущего. Если вы хотите заказать на завтра, то укажите дату и время.");
          return false;
        }
      }

      orderFields = {
        items: items,
        isSelfService: false,
        customer: {
          name: formFields['name'],
          phone: formFields['phone']
        },
        orderType: 'delivery',
        bonusPoints: parseInt(formFields['bonus']),
        terminalGroupId: formFields['terminalGroupId'],
        paymentItems: [
          {
            sum: (this.cartTotal - parseInt(formFields['bonus'])) * 100,
            paymentTypeKind: "Card"
          }
        ]
      };

      if(this.checkedTime == 'time') orderFields['deliveryTime'] = timeDelivry;

      this.$store.dispatch('submitOrder', orderFields).then(async (response) => {
        if(response.success) {
          if(isTest) return true;

          const modal = await modalController.create({
            component: CheckoutModal,
            cssClass: 'checkout-modal',
            backdropDismiss: false
          });

          return modal.present();
        }
        else return this.presentToast(response.error ? response.error.message : 'Не удалось оформить заказ');
      });
    },
    async presentToast(message, duration = 2000) {
      const toast = await toastController.create({
        message: message,
        duration: duration
      });

      return toast.present();
    },
    async openModal(name) {
      const modal = await modalController.create({
        component: Modal,
        componentProps: { type: name }
      });

      return modal.present();
    },
    async requestConfirmationCode() {
      this.$store.dispatch('requestConfirmationCode', this.user.phone);
    },
    validateBonusField() {
      if(this.bonusPoints > this.bonus) this.bonusPoints = this.bonus;
    }
  }
}
</script>

<style scoped>
/* Стили для кнопок */
button {
  width: 140px;
  height: 35px;
  border-radius: 20px;
  background-color: #F9D9B8;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  border: 1px solid;
}
input {
  background-color: white;
  width: 520px;
  height: 40px;
  left: 315px;
  font-size: 14px;
  font-weight: 700;
  border: 1px solid black;
}
.radio-options div {
  display: flex; /* Располагаем кнопку и текст в строку */
  align-items: center; /* Выравниваем элементы по вертикали */
  margin-top: 10px;
}

.radio-options input[type="radio"] {
  /* Убираем стандартные стили радио-кнопок */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /* Устанавливаем размер кнопок */
  width: 20px;
  height: 20px;
  /* Устанавливаем стили для кнопок */
  border: 1px solid #000;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  margin-right: 10px; /* Добавляем отступ между кнопками и текстом */
}


</style>