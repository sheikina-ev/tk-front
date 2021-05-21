<template>
	<div class="order-item-position-wrap">
		<div class="flex-between">
			<b v-if="product.product_name">{{ product.product_name }}</b>
			<b v-else>Товар</b>
			<span v-if="product.price">{{ product.price }} руб.</span>
			<span v-else> 999 руб.</span>
		</div>

		<div v-if="product.modifiers" class="flex-column">
			<b>Добавки:</b>
			<span v-for="modifier in product.modifiers" :key="modifier.id">{{ modifier.name }}</span>
		</div>
	</div>
</template>

<script>

export default {
	props: ['product']
}
</script>
