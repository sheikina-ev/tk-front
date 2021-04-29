<template>
	<base-layout page-title="Каталог">
		<coffee-shop :shop="activeShop"></coffee-shop>
		<coffee-sections-list :sections="sections" :sectionId="activeSection"></coffee-sections-list>
		<coffee-list v-if="activeSection > 0" :sectionId="activeSection" :key="activeSection"></coffee-list>
	</base-layout>
</template>

<script>
import { loadingController } from '@ionic/vue';
import CoffeeShop from '../components/coffee/CoffeeShop.vue';
import CoffeeSectionsList from '../components/coffee/CoffeeSectionsList.vue';
import CoffeeList from '../components/coffee/CoffeeList.vue';
import axios from 'axios';

export default {
	components: {
		CoffeeShop,
		CoffeeSectionsList,
		CoffeeList
	},
	async mounted() {
		const loading = await loadingController.create({
			cssClass: 'loading-obj',
			message: 'Пожалуйста подождите...'
		});

		await loading.present();

		await axios.get('https://coffee.dev.webstripe.ru/public/api/catalog/getCategories').then((response) => {
			this.$store.commit('updateSections', response.data.categories);
			this.$store.commit('setActiveSection', response.data.defaultCategory.id);
			loading.dismiss();
		}).catch((err) => {
			console.log(err);
			loading.dismiss();
		});
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
