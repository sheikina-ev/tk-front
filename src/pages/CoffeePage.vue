<template>
  <base-layout page-title="Каталог">
    <coffee-sections-list :sections="sections" :sectionId="activeSection"></coffee-sections-list>
    <coffee-list v-if="activeSection > 0" :sectionId="activeSection" :key="activeSection"></coffee-list>
  </base-layout>
</template>

<script>
import CoffeeSectionsList from '../components/coffee/CoffeeSectionsList.vue';
import CoffeeList from '../components/coffee/CoffeeList.vue';
import BaseLayout from "@/components/base/BaseLayout.vue";

export default {
  components: {
    BaseLayout,
    CoffeeSectionsList,
    CoffeeList
  },
  async mounted() {
    try {
      // this.$store.dispatch('loadStateFromStorage');  // Загружаем сохраненные данные

      // Асинхронный вызов для получения категорий
      const response = await this.$store.dispatch('getCategories');

      if (response) {
        // Все успешно
        console.log('Categories fetched:', response);
      } else {
        // Обработка ошибки, если данные не были получены
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },
  computed: {
    sections() {
      return this.$store.getters.sections;  // Список категорий
    },
    activeSection() {
      return this.$store.getters.activeSection;  // Активная категория
    },
  }
};
</script>
