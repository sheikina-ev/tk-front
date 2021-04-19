<template>
	<base-layout :page-title="coffeeItem ? coffeeItem.product_name : 'Loading...'" page-default-back-link="/coffee">
		<h2 v-if="!coffeeItem">Item not found</h2>
		<coffee-overview v-else :coffeeItem="coffeeItem"></coffee-overview>
	</base-layout>
</template>

<script>
import { loadingController } from '@ionic/vue';
import CoffeeOverview from '../components/coffee/CoffeeOverview.vue';
import axios from 'axios';

export default {
	components: {
		CoffeeOverview
	},
	data() {
		return {
			productId: this.$route.params.id
		}
	},
	async mounted() {
		const loading = await loadingController.create({
			cssClass: 'loading-obj',
			message: 'Пожалуйста подождите'
		});

		this.$store.commit('clearState', 'product');
		await loading.present();

		await axios.get('http://coffee.dev.webstripe.ru/public/api/catalog/getProduct', {params: {id: this.productId}}).then((response) => {
			this.$store.commit('setProduct', response.data.product);
			loading.dismiss();
		}).catch((err) => {
			console.log(err);
			loading.dismiss();
		});
	},
	computed: {
		coffeeItem() {
			return this.$store.getters.product;
		}
	}
}
</script>
