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
    const response = this.$store.dispatch('getCategories');

    if(response) {
      // All good
    } else {
      // Not good
    }
  },
  computed: {
    sections() {
      return this.$store.getters.sections;
    },
    activeSection() {
      return this.$store.getters.activeSection;
    },
    activeShop() {
      return this.$store.getters.activeShop;
    }
  }
}
</script>