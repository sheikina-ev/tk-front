<template>
	<ion-item v-if="shop !== false" class="shop-item">
		<label class="label">
			<ion-radio :id="`check-address-${shop.id}`" :value="shop.id"></ion-radio>
			<ion-label>{{ shop.store_name }}</ion-label>
		</label>
		<div class="details">
			<span>{{ shop.time_from }} - {{ shop.time_to }}</span>
			<ion-note v-if="shop.store_phone" :href="`tel:`+shop.store_phone">{{ shop.store_phone }}</ion-note>
		</div>
	</ion-item>
	<ion-item v-else class="shop-item">
		<label class="label">
			<ion-radio class="shop-radio" disabled="true"></ion-radio>
			<label class="check-address"></label>
			<ion-label style="width:5em"><ion-skeleton-text animated style="width:100%"></ion-skeleton-text></ion-label>
		</label>
		<div class="details">
			<ion-skeleton-text animated style="width:6em"></ion-skeleton-text>
			<ion-skeleton-text animated style="width:6em"></ion-skeleton-text>
		</div>
	</ion-item>
</template>

<script>
import { IonRadio, IonLabel, IonItem, IonNote, IonSkeletonText } from '@ionic/vue';

export default {
	props: ['shop'],
	components: { IonRadio, IonLabel, IonItem, IonNote, IonSkeletonText }
}
</script>
