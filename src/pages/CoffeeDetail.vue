<template>
	<base-layout :page-title="loadedItem ? loadedItem.title : 'Loading...'" page-default-back-link="/coffee">
		<h2 v-if="!loadedItem">Item not found</h2>
		<coffee-overview v-else :title="loadedItem.title" :image="loadedItem.image" :description="loadedItem.description"></coffee-overview>
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
			coffeeId: this.$route.params.id
		}
	},
	computed: {
		loadedItem() {
			return this.$store.getters.coffee(this.coffeeId);
		}
	}
}
</script>
