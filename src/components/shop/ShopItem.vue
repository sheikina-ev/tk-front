<template>
	<ion-item class="shop-item">
		<label class="label">
			<ion-radio :id="`check-address-${shop.id}`" class="shop-radio" :value="shop.id"></ion-radio>
			<label :for="`check-address-${shop.id}`" class="check-address" ></label>
			<ion-label>{{ shop.address }}</ion-label>
		</label>
		<div class="details">
			<span>{{ shop.timeFrom }} - {{ shop.timeTo }}</span>
			<a :href="`tel:`+shop.phone">{{ shop.phone }}</a>
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
