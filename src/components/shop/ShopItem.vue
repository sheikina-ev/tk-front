<template>
	<div class="shop-item">
		<label class="label">
			<ion-radio class="shop-radio" :value="shop.id"></ion-radio>
			<ion-label>{{ shop.store_name }}</ion-label>
		</label>
		<div class="details">
			<span>{{ shop.time_from }} - {{ shop.time_to }}</span>
			<a v-if="shop.phone" :href="`tel:`+shop.phone">{{ shop.phone }}</a>
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
