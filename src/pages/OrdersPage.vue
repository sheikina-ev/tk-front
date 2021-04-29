<template>
	<base-layout page-title="Мои заказы">
		<div v-if="orders.length > 0">
			<order-item v-for="order in orders" :key="order.id" :order="order"></order-item>
		</div>
		<div v-else class="center-content">
			<p class="text-center">Здесь будут ваши заказы</p>
		</div>
	</base-layout>
</template>

<script>
import OrderItem from '../components/order/OrderItem.vue';

export default {
	components: {
		OrderItem
	},
	computed: {
		orders() {
			return this.$store.getters.orders;
		}
	}
}
</script>
