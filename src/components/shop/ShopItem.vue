<template>
	<div class="shop-item">
		<label class="label">
			<ion-radio class="shop-radio" :value="shop.id"></ion-radio>
			<ion-label>{{ shop.address }}</ion-label>
		</label>
		<div class="details">
			<span>{{ shop.timeFrom }} - {{ shop.timeTo }}</span>
			<a :href="`tel:`+shop.phone">{{ shop.phone }}</a>
		</div>
	</div>
</template>

<script>
import { IonRadio, IonLabel } from '@ionic/vue';

export default {
	props: ['shop'],
	components: { IonRadio, IonLabel }
}
</script>
