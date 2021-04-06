<template>
	<base-layout page-title="Coffee list">
		<coffee-list :coffeeList="coffeeList"></coffee-list>
	</base-layout>
</template>

<script>
import CoffeeList from '../components/coffee/CoffeeList.vue'

export default {
	components: {
		CoffeeList
	},
	computed: {
		coffeeList() {
			return this.$store.getters.coffeeList;
		}
	}
}
</script>
