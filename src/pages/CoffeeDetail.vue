<template>
	<base-layout :page-title="loadedItem ? loadedItem.product_name : 'Loading...'" page-default-back-link="/coffee">
		<h2 v-if="!loadedItem">Item not found</h2>
		<coffee-overview v-else :name="loadedItem.product_name" :loadedItem="loadedItem"></coffee-overview>
	</base-layout>
</template>

<script>
import CoffeeOverview from '../components/coffee/CoffeeOverview.vue';

export default {
	components: {
		CoffeeOverview
	},
	data() {
		return {
			productId: this.$route.params.id
		}
	},
	computed: {
		loadedItem() {
			console.log(this.$store.getters.product(this.productId));
			return this.$store.getters.product(this.productId);
		}
	}
}
</script>
