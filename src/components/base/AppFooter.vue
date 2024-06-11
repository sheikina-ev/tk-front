<template>
  <div class="flex flex-col md:flex-row justify-between items-center p-5 bg-brown-800 text-white" style="background-color: #553b2f; height: 333px; padding-left: 315px; padding-right: 315px;">
    <div class="flex justify-center md:mb-0">
      <img src="@/assets/img/logo.png" alt="Logo" class="w-[198px]" />
    </div>
    <div class="flex-2 flex md:flex-row w-full md:w-auto">
      <!-- Блок с ссылками для клиентов -->
      <div class="flex flex-col items-start mb-4 md:mb-0" style="margin-left: 140px;">
        <h2 class="mb-2 py-1">КЛИЕНТАМ</h2>
        <ul class="list-none p-0">
          <li class="mb-2"><router-link to="/" class="text-white hover:text-yellow-500">Меню</router-link></li>
          <li class="mb-2"><router-link to="/cart" class="text-white hover:text-yellow-500">Корзина</router-link></li>
        </ul>
      </div>
      <!-- Конец блока с ссылками для клиентов -->
      <!-- Блок обратной связи -->
      <div class="flex flex-col items-start mb-4 md:mb-0" style="margin-left: 140px;">
        <h2 class="mb-2 py-1">ОБРАТНАЯ СВЯЗЬ</h2>
        <ul class="list-none p-0">
          <li class="mb-2"><router-link to="/review" class="text-white hover:text-yellow-500">Оставить отзыв</router-link></li>
          <li class="mb-2"><router-link to="/feedback" class="text-white hover:text-yellow-500">Сообщить о технической проблеме</router-link></li>
        </ul>
      </div>
      <!-- Конец блока обратной связи -->
      <!-- Блок с контактной информацией -->
      <div class="w-full md:w-1/2 mb-4 md:mb-0" style="margin-left: 140px;">
        <p class="text-white">+7 903 951 07 70</p>
        <p class="text-white">Томск, Ленина, 1</p>
        <p class="text-white">Томск, Усова, 9Б</p>
        <div class="flex gap-2 mt-4">
          <a href="#" class="bg-white rounded-full text-black p-2" style="width: 30px; height: 30px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.938l6.5 4.071L14.5 2.707l-6.5-4.072V3Zm1 1H14v-.769l-6.5 4.071L8 8.862l6.5 4.071V7Zm-.769-2.306L8 6.084l-5.231 3.113V5.738l5.231-3.113Zm-2.75.814L8 4.694l-5.231 3.113v.769l5.231 3.113ZM1.281 8.432l6.5-4.071L14.719 8.432l-6.5 4.071L1.281 8.432ZM14 10.769V12l-6.5 4.071L1 8.432l6.5-4.071V10.769l-6.5 4.071l5.719 3.504L14 10.769Zm-13.719.855L8 12.694l5.231-3.113V11.432l-5.231 3.113ZM1 9.432l6.5-4.071L14.719 9.432l-6.5 4.071L1 9.432Zm13.719 1.144L8 10.694l-5.231 3.113V10.432l5.231 3.113ZM1 8.432l6.5-4.071L14.719 8.432l-6.5 4.071L1 8.432Z"/>
            </svg>
          </a>
          <a href="#" class="bg-white rounded-full text-black p-2" style="width: 30px; height: 30px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-vk" viewBox="0 0 16 16">
              <path d="M11.965 12.175c-.88-.605-1.894-1.037-3.005-1.244V9.788h2.628c.778.128 1.438.463 1.943.962.505.5 1.062 1.25 1.46 2.113.397.863.528 1.823.41 2.81-.117.987-.622 1.687-1.38 2.093-.758.405-1.684.613-2.757.613h-.859c-1.073 0-2.006-.208-2.758-.613-.758-.405-1.263-.987-1.38-2.093-.118-.987.013-1.947.41-2.81.397-.863 1.054-1.513 1.46-2.113.505-.5 1.165-.834 1.943-.962h2.628V7.032c-1.111.207-2.125.639-3.005 1.244-.88.605-1.232 1.374-1.232 2.236v.934c0 .862.352 1.63.99 2.236.64.605 1.374.859 2.236.859h.859c.862 0 1.63-.352 2.236-.99.605-.64.859-1.374.859-2.236v-.934c0-.862-.352-1.63-.99-2.236-.64-.605-1.374-.859-2.236-.859h-.859z"/>
            </svg>
          </a>
        </div>
      </div>
      <div class="w-full md:w-1/2 mb-4 md:mb-0">
        <p class="text-white">Разработано Sibcode</p>
      </div>
      <!-- Конец блока с контактной информацией -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['shops'])
  }
}
</script>
