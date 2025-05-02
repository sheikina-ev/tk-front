<template>
	<ion-chip :class="activeSection == coffeeSectionItem.id ? `selected` : ``" :id="coffeeSectionItem.id" v-on:click="selectSection">{{ coffeeSectionItem.name }}</ion-chip>
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
			if(!this.products) return false;
			const sectionId = e.target.id;
			if(!e.target.classList.contains('selected')) {
				this.$store.commit('setActiveSection', Number(sectionId));
			}
		}
	},
	computed: {
		products() {
			return this.$store.getters.products;
		},
		activeSection() {
			return this.$store.getters.activeSection;
		}
	}
};
</script>
