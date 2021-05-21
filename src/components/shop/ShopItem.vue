<template>
	<ion-item class="shop-item">
		<label class="label">
			<ion-radio :id="`check-address-${shop.id}`" class="shop-radio" :value="shop.id"></ion-radio>
			<label :for="`check-address-${shop.id}`" class="check-address" ></label>
			<ion-label>{{ shop.store_name }}</ion-label>
		</label>
		<div class="details">
			<span>{{ shop.time_from }} - {{ shop.time_to }}</span>
			<a v-if="shop.store_phone" :href="`tel:`+shop.store_phone">{{ shop.store_phone }}</a>
		</div>
	</ion-item>
</template>

<script>
import { IonRadio, IonLabel, IonItem } from '@ionic/vue';

export default {
	props: ['shop'],
	components: { IonRadio, IonLabel, IonItem }
}
</script>
