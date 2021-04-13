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
	}
};
</script>
