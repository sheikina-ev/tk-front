<template>
	<ion-grid>
		<ion-row v-if="products.length > 0">
			<coffee-list-item v-for="coffeeItem in products" :key="coffeeItem.id" :coffeeItem="coffeeItem"></coffee-list-item>
		</ion-row>
		<ion-row v-else-if="products.constructor === Boolean && !products">
			<ion-col size="6" class="skeleton">
				<ion-card class="coffee-card">
					<div class="skeleton-wrap">
						<ion-skeleton-text animated></ion-skeleton-text>
					</div>
				</ion-card>
				<div class="coffee-item-info">
					<span class="ion-text-center coffee-item-name"><ion-skeleton-text animated></ion-skeleton-text></span>
					<p class="ion-text-center coffee-item-price"><ion-skeleton-text animated></ion-skeleton-text></p>
				</div>
			</ion-col>
			<ion-col size="6" class="skeleton">
				<ion-card class="coffee-card">
					<div class="skeleton-wrap">
						<ion-skeleton-text animated></ion-skeleton-text>
					</div>
				</ion-card>
				<div class="coffee-item-info">
					<span class="ion-text-center coffee-item-name"><ion-skeleton-text animated></ion-skeleton-text></span>
					<p class="ion-text-center coffee-item-price"><ion-skeleton-text animated></ion-skeleton-text></p>
				</div>
			</ion-col>
			<ion-col size="6" class="skeleton">
				<ion-card class="coffee-card">
					<div class="skeleton-wrap">
						<ion-skeleton-text animated></ion-skeleton-text>
					</div>
				</ion-card>
				<div class="coffee-item-info">
					<span class="ion-text-center coffee-item-name"><ion-skeleton-text animated></ion-skeleton-text></span>
					<p class="ion-text-center coffee-item-price"><ion-skeleton-text animated></ion-skeleton-text></p>
				</div>
			</ion-col>
			<ion-col size="6" class="skeleton">
				<ion-card class="coffee-card">
					<div class="skeleton-wrap">
						<ion-skeleton-text animated></ion-skeleton-text>
					</div>
				</ion-card>
				<div class="coffee-item-info">
					<span class="ion-text-center coffee-item-name"><ion-skeleton-text animated></ion-skeleton-text></span>
					<p class="ion-text-center coffee-item-price"><ion-skeleton-text animated></ion-skeleton-text></p>
				</div>
			</ion-col>
		</ion-row>
		<ion-row v-else>
			<ion-col>
				<h2 class="text-center">Раздел пуст</h2>
			</ion-col>
		</ion-row>
	</ion-grid>
</template>

<script>
import { IonGrid, IonRow, IonCol, IonCard, IonSkeletonText } from '@ionic/vue';
import CoffeeListItem from './CoffeeListItem.vue';

export default {
	props: ['sectionId'],
	components: {
		IonGrid,
		IonRow,
		IonCol,
		IonCard,
		IonSkeletonText,
		CoffeeListItem
	},
	async mounted() {
		const response = this.$store.dispatch('getProducts', {params: {id: this.$props.sectionId}});

		if(response) {
			// All good
		} else {
			// Not good
		}
	},
	computed: {
		products() {
			return this.$store.getters.products;
		}
	}
}
</script>
