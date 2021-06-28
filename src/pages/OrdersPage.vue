<template>
	<base-layout page-title="Мои заказы">
		<div v-if="!isAuthorized && Object.keys(user).length <= 0" class="center-content">
			<p class="text-center">
				Для просмотра истории заказов необходимо авторизоваться
			</p>
		</div>
		<div v-else-if="orders.length > 0">
			<order-item v-for="order in orders" :key="order.id" :order="order"></order-item>
		</div>
		<div v-else-if="orders.constructor === Boolean && !orders">
			<order-item :order="false"></order-item>
			<order-item :order="false"></order-item>
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
	async created() {
		if(this.isAuthorized) this.$store.dispatch('getOrderHistory', this.user.phone);
	},
	computed: {
		isAuthorized() {
			return this.$store.getters.isAuthorized;
		},
		user() {
			return this.$store.getters.user;
		},
		orders() {
			return this.$store.getters.orders;
		}
	}
}
</script>
