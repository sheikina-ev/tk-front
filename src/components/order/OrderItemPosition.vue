<template>
	<div class="order-item-position-wrap">
		<div class="flex-between">
			<b>{{ product.name }}</b>
			<span>{{ product.price }} руб.</span>
		</div>

		<div v-if="product.options.length > 0" class="flex-column">
			<b>Добавки:</b>
			<span v-for="option in product.options" :key="option.id">{{ option.name }}</span>
		</div>
	</div>
</template>

<script>

export default {
	props: ['product']
}
</script>
