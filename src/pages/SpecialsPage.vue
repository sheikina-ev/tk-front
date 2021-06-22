<template>
	<base-layout page-title="Наши акции">
		<ion-refresher slot="fixed" @ionRefresh="doRefresh">
			<ion-refresher-content></ion-refresher-content>
		</ion-refresher>
		<ion-grid v-if="specials.length > 0">
			<ion-row>
				<specials-item v-for="special in specials" :key="special.key" :special="special"></specials-item>
			</ion-row>
		</ion-grid>
		<ion-grid v-else-if="specials.constructor === Boolean && !specials">
			<ion-row>
				<specials-item :special="false"></specials-item>
				<specials-item :special="false"></specials-item>
			</ion-row>
		</ion-grid>
		<div class="center-content" v-else>
			<h2 class="text-center">Активные акции отсутствуют</h2>
		</div>
	</base-layout>
</template>

<script>
import { IonGrid, IonRow, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { chevronDownCircleOutline } from 'ionicons/icons';
import SpecialsItem from '../components/specials/SpecialsItem.vue';

export default {
	components: {
		IonGrid,
		IonRow,
		IonRefresher,
		IonRefresherContent,
		SpecialsItem
	},
	setup() {
		return { chevronDownCircleOutline };
	},
	async mounted() {
		await this.$store.dispatch('getSpecials');
	},
	computed: {
		specials() {
			return this.$store.getters.specials;
		}
	},
	methods: {
		async doRefresh(e) {
			await this.$store.dispatch('getSpecials');
			e.target.complete();
		}
	}
}
</script>
