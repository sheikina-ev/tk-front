<template>
	<ion-content>
		<ion-grid>
			<ion-row>
				<coffee-list-item v-for="coffeeItem in coffeeList" :key="coffeeItem.id" :coffeeItem="coffeeItem"></coffee-list-item>
			</ion-row>
		</ion-grid>
	</ion-content>
</template>

<script>
import { IonGrid, IonRow, IonContent } from '@ionic/vue';
import CoffeeListItem from './CoffeeListItem.vue';

export default {
	props: ['coffeeList'],
	components: {
		IonGrid,
		IonRow,
		IonContent,
		CoffeeListItem
	}
}
</script>
