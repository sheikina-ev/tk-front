<template>
	<base-layout page-title="Coffee list">
		<coffee-sections-list :sections="sections" :sectionId="activeSection"></coffee-sections-list>
		<coffee-list v-if="activeSection > 0" :sectionId="activeSection" :key="activeSection"></coffee-list>
	</base-layout>
</template>

<script>
import { loadingController } from '@ionic/vue';
import CoffeeSectionsList from '../components/coffee/CoffeeSectionsList.vue'
import CoffeeList from '../components/coffee/CoffeeList.vue'
import axios from 'axios';

export default {
	components: {
		CoffeeSectionsList,
		CoffeeList
	},
	async mounted() {
		const loading = await loadingController.create({
			cssClass: 'loading-obj',
			message: 'Пожалуйста подождите...'
		});

		await loading.present();

		await axios.get('http://coffee.dev.webstripe.ru/public/api/catalog/getCategories').then((response) => {
			this.$store.commit('updateSections', response.data.categories);
			this.$store.commit('setActiveSection', response.data.defaultCategory.id);
			loading.dismiss();
		});
	},
	computed: {
		sections() {
			return this.$store.getters.sections;
		},
		activeSection() {
			return this.$store.getters.activeSection;
		}
	}
}
</script>
