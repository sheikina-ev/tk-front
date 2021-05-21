<template>
	<ion-chip :id="coffeeSectionItem.id" v-on:click="selectSection">{{ coffeeSectionItem.name }}</ion-chip>
</template>

<script>
import { IonChip } from '@ionic/vue';

export default {
	props: ['coffeeSectionItem'],
	components: {
		IonChip
	},
	methods: {
		selectSection(e) {
			if(!this.products) return false; // Prevent user from clicking on another section item while the current one is loading
			const siblings = e.target.parentNode.children;
			const sectionId = e.target.id;

			if(!e.target.classList.contains('selected')) {
				siblings.forEach(item => {
					item.classList.remove('selected');
				});
				e.target.classList.add('selected');

				this.$store.commit('setActiveSection', Number(sectionId));
			}
		}
	},
	computed: {
		products() {
			return this.$store.getters.products;
		}
	}
};
</script>
