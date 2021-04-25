<template>
	<base-layout page-title="Наши акции">
		<ion-grid v-if="specials.length > 0">
			<ion-row>
				<specials-item v-for="special in specials" :key="special.key" :special="special"></specials-item>
			</ion-row>
		</ion-grid>
		<div class="center-content" v-else>
			<h2 class="text-center">Активные акции отсутствуют</h2>
		</div>
	</base-layout>
</template>

<script>
import { IonGrid, IonRow } from '@ionic/vue';
import SpecialsItem from '../components/specials/SpecialsItem.vue';

export default {
	components: {
		IonGrid,
		IonRow,
		SpecialsItem
	},
	computed: {
		specials() {
			return this.$store.getters.specials;
		}
	}
}
</script>
