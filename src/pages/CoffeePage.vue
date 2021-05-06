<template>
	<base-layout page-title="Каталог">
		<coffee-shop :shop="activeShop"></coffee-shop>
		<coffee-sections-list :sections="sections" :sectionId="activeSection"></coffee-sections-list>
		<coffee-list v-if="activeSection > 0" :sectionId="activeSection" :key="activeSection"></coffee-list>
	</base-layout>
</template>

<script>
import CoffeeShop from '../components/coffee/CoffeeShop.vue';
import CoffeeSectionsList from '../components/coffee/CoffeeSectionsList.vue';
import CoffeeList from '../components/coffee/CoffeeList.vue';

export default {
	components: {
		CoffeeShop,
		CoffeeSectionsList,
		CoffeeList
	},
	async mounted() {
		this.$store.dispatch('getCategories');
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
