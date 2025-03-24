<template>
  <ion-page id="main">
    <base-layout page-title="Вход">

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-screen">
        <div class="auth-container bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <form @submit="requestConfirmationCode">
            <h1 class="text-xl font-extrabold mb-6 text-center">Вход в профиль</h1>

            <p class="text-gray-600 text-center mb-6">Войдите, чтобы заказывать кофе заранее и пользоваться нашими
              акциями!</p>

            <!-- Ввод номера телефона -->
            <ion-label class="auth-input-label" position="stacked">Введите свой номер телефона</ion-label>
            <ion-input color="dark" class="auth-input mb-4 p-3 border rounded-lg w-full" name="phone"
                       @ionChange="format" placeholder="+ 7 ( ___ ) ___- __- __" autocomplete="tel" type="tel"
                       required="true" :value="user?.phone"></ion-input>

            <!-- Ввод имени -->
            <ion-label class="auth-input-label" position="stacked">Как Вас зовут?</ion-label>
            <ion-input color="dark" class="auth-input mb-6 p-3 border rounded-lg w-full" name="name" autocomplete="name"
                       type="text" required="true" :value="user?.name"></ion-input>

            <!-- Кнопки -->
            <ion-button
                class="w-full bg-custom-color text-white text-sm font-medium  rounded-full hover:bg-opacity-80 transition"
                type="submit">
              Войти по номеру телефона
            </ion-button>
          </form>

          <!-- Ссылка на условия -->
          <div class="mt-6 text-center">
            <div class="bottom-link-wrap flex justify-center mt-4">
              <a @click="openPolicyModal" class="text-xs text-gray-500 hover:underline cursor-pointer">

                Обработка персональных данных</a>
            </div>
          </div>
        </div>
      </div>
      <!-- Модалка для обработки персональных данных -->
      <ion-modal :is-open="isPolicyModalOpen" @didDismiss="closePolicyModal">
        <div class="modal-content p-6 bg-white rounded-lg shadow-lg text-center">
          <h2 class="text-lg font-bold mb-4">Обработка персональных данных</h2>
          <p class="text-sm text-gray-600 text-left">
            Мы заботимся о безопасности ваших данных и соблюдаем требования законодательства о защите персональной
            информации.
            <br><br>
            При использовании нашего сервиса мы можем собирать и обрабатывать следующие данные:
          </p>
          <ul class="text-sm text-gray-600 text-left mt-2 list-disc pl-6">
            <li>Ваше имя и номер телефона для идентификации и авторизации.</li>
            <li>Историю заказов и предпочтения для улучшения сервиса.</li>
            <li>Данные об использовании приложения для анализа и улучшения пользовательского опыта.</li>
          </ul>
          <p class="text-sm text-gray-600 text-left mt-4">
            Мы не передаем ваши данные третьим лицам без вашего согласия и используем их только в целях предоставления
            сервиса.
            <br><br>
            Полную информацию о политике обработки персональных данных вы можете найти в
            <a href="#" class="text-blue-500 underline">Политике конфиденциальности</a>.
          </p>
          <button class="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg" @click="closePolicyModal">
            Закрыть
          </button>
        </div>
      </ion-modal>


    </base-layout>
  </ion-page>
</template>

<script>
import {IonPage, IonLabel, IonInput, IonButton, IonModal, alertController, toastController} from '@ionic/vue';
import {useRouter} from 'vue-router';
import BaseLayout from "@/components/base/BaseLayout.vue";

export default {
  components: {
    BaseLayout,
    IonPage,
    IonLabel,
    IonInput,
    IonButton,
    IonModal
  },
  setup() {
    const router = useRouter();
    return {router};
  },
  data() {
    return {
      isPolicyModalOpen: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    openPolicyModal() {
      this.isPolicyModalOpen = true;
    },
    closePolicyModal() {
      this.isPolicyModalOpen = false;
    },
    async throwToast(message) {
      const toast = await toastController.create({
        message: message,
        cssClass: 'toast-mb',
        mode: 'md',
        duration: 3000,
      });

      toast.present();
    },
    async authorize(params) {
      const response = await this.$store.dispatch('login', {params: params});

      if (response) {
        this.throwToast(response.message === 'Sign-up' ? 'Регистрация выполнена успешно' : 'С возвращением!');

        // Проверяем, есть ли redirect, если нет — переходим в профиль
        const redirectPath = this.$route.query.redirect || '/profile';
        this.router.replace(redirectPath);
      } else {
        this.throwToast('Ошибка авторизации');
      }
    }
    ,
    async showConfirmationPrompt(params, message = '') {
      const alert = await alertController.create({
        cssClass: 'auth-code-prompt',
        header: 'Подтверждение',
        subHeader: message,
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
      console.log("Отправляем код для подтверждения:", params);

      const response = await this.$store.dispatch('sendConfirmationCode', {
        params: {
          phone: params.phone,
          code: params.code
        }
      });

      if (response) {
        console.log("Ответ от сервера (проверка кода):", response);

        if (response.status === 'OK') {
          this.authorize(params);
        } else {
          this.showConfirmationPrompt(params, 'Код неверен');
        }
      } else {
        this.throwToast('Проверьте подключение к интернету или повторите попытку позже');
        this.showConfirmationPrompt(params);
      }
    },
    async requestConfirmationCode(e) {
      e.preventDefault();

      var params = {};
      const formData = new FormData(e.target);

      for (var key of formData.keys()) {
        params[key] = formData.get(key);
      }

      console.log('Параметры для отправки на сервер:', params);

      const response = await this.$store.dispatch('requestConfirmationCode', {params: {phone: params.phone}});
      if (response) {
        console.log('Ответ от сервера (запрос кода):', response);

        if (response.status === 'OK') {
          this.showConfirmationPrompt(params);
        } else {
          this.throwToast('Проверьте введённые данные');
        }
      } else {
        this.throwToast('Проверьте подключение к интернету или повторите попытку позже');
      }
    },

  }
}
</script>


<style scoped>

.modal-content {
  max-width: 400px;
  margin: auto;
}
</style>
