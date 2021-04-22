<template>
	<div class="coffee-section-wrap">
		<coffee-section-item v-show="sections" v-for="coffeeSectionItem in sections" :key="coffeeSectionItem.id" :coffeeSectionItem="coffeeSectionItem" :sectionId="sectionId"></coffee-section-item>
	</div>
</template>

<script>
import CoffeeSectionItem from './CoffeeSectionItem.vue';

export default {
	props: ['sections', 'sectionId'],
	components: {
		CoffeeSectionItem
	}
};
</script>
