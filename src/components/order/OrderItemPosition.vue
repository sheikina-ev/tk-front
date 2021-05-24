<template>
	<div class="order-item-position-wrap">
		<div class="flex-between">
			<b v-if="product.name_product">{{ product.name_product }}</b>
			<span v-if="product.price_product">{{ product.price_product }} руб.</span>
		</div>

		<div v-if="product.modifiers" class="flex-column">
			<b>Добавки:</b>
			<span v-for="modifier in product.modifiers" :key="modifier.id">{{ modifier.name_options }}</span>
		</div>
	</div>
</template>

<script>

export default {
	props: ['product']
}
</script>
