<template>
	<input type="hidden" name="id" :value="coffeeItem.id">
	<input type="hidden" name="price" :value="coffeeItem.price">

	<div class="coffee-picture-container" :style="coffeeItem.image ? `background-image:url('`+coffeeItem.image+`')` : `background-image:url('../assets/img/no-image-contrast.jpg')`">
		<div v-if="coffeeItem.constructor === Object" class="coffee-picture-info-wrap">
		</div>
		<div v-else class="coffee-picture-info-wrap no-padding">
			<ion-skeleton-text animated></ion-skeleton-text>
		</div>
	</div>

	<div v-if="coffeeItem.constructor === Object" class="coffee-info-container">
		<p v-if="coffeeItem.product_description" class="">{{ coffeeItem.product_description }}</p>
		<p v-else class=""><i>Описание отсутствует</i></p>
	</div>
	<div v-else class="coffee-info-container">
		<ion-skeleton-text animated></ion-skeleton-text>
	</div>
	
	<div v-if="coffeeItem.options && coffeeItem.options.length > 0" class="coffee-modifiers-container">
		<ion-list v-for="groups in coffeeItem.options" :key="groups.id">
			<ion-radio-group @ionChange="setRadioOption" name="options" :allow-empty-selection="groups.min_amount === 1 || groups.required ? `false` : `true`" v-if="groups.max_amount === 1" :value="groups.min_amount === 1 || groups.required ? groups.values[0].id : ``">
				<input type="hidden" name="options" :value="groups.min_amount === 1 || groups.required ? groups.values[0].id : ``">
				<h3>{{ groups.name }}</h3>
				<ion-item lines="none" v-for="option in groups.values" :key="option.id">
					<ion-radio :value="option.id" slot="start"></ion-radio>
					<ion-label class="option-label"><span>{{ option.name }}</span><span v-if="option.price > 0">{{ option.price }} руб.</span></ion-label>
				</ion-item>
			</ion-radio-group>
			<div v-else-if="groups.max_amount > 1" class="checkbox-wrap">
				<h3>{{ groups.name }}</h3>
				<ion-item lines="none" v-for="option in groups.values" :key="option.id">
					<ion-checkbox name="options" :value="option.id" slot="start" :checked="(groups.min_amount === 1 || groups.required) && groups.values[0] === option ? `true` : `false`"></ion-checkbox>
					<ion-label>{{ option.name }}</ion-label>
					<ion-note v-if="option.price > 0" slot="end">{{ option.price }} руб.</ion-note>
					<ion-note v-else slot="end">&nbsp;</ion-note>
				</ion-item>
			</div>
		</ion-list>
	</div>
	<div v-else-if="coffeeItem.constructor !== Object" class="coffee-modifiers-container">
		<ion-list>
			<div class="checkbox-wrap">
				<h3><ion-skeleton-text animated></ion-skeleton-text></h3>
				<ion-item lines="none">
					<ion-checkbox slot="start" disabled="true"></ion-checkbox>
					<ion-label><ion-skeleton-text animated></ion-skeleton-text></ion-label>
				</ion-item>
				<ion-item lines="none">
					<ion-checkbox slot="start" disabled="true"></ion-checkbox>
					<ion-label><ion-skeleton-text animated></ion-skeleton-text></ion-label>
				</ion-item>
				<ion-item lines="none">
					<ion-checkbox slot="start" disabled="true"></ion-checkbox>
					<ion-label><ion-skeleton-text animated></ion-skeleton-text></ion-label>
				</ion-item>
				<ion-item lines="none">
					<ion-checkbox slot="start" disabled="true"></ion-checkbox>
					<ion-label><ion-skeleton-text animated></ion-skeleton-text></ion-label>
				</ion-item>
			</div>
		</ion-list>
	</div>

	<div v-if="coffeeItem.energyAmount !== 'NaN' && coffeeItem.proteinsAmount !== 'NaN' && coffeeItem.fatAmount !== 'NaN' && coffeeItem.carbohydratesAmount !== 'NaN'" class="coffee-calorific-info-container">
		<h3>Калорийность "{{ coffeeItem.product_name }}"</h3>
		<div class="wrap">
			<div class="item">
				<div class="value">{{ coffeeItem.energyAmount && coffeeItem.energyAmount !== 'NaN' ? coffeeItem.energyAmount : 0 }}</div>
				<div class="label">Ккал</div>
			</div>
			<div class="item">
				<div class="value">{{ coffeeItem.proteinsAmount && coffeeItem.proteinsAmount !== 'NaN' ? coffeeItem.proteinsAmount : 0 }}</div>
				<div class="label">Белки, г</div>
			</div>
			<div class="item">
				<div class="value">{{ coffeeItem.fatAmount && coffeeItem.fatAmount !== 'NaN' ? coffeeItem.fatAmount : 0 }}</div>
				<div class="label">Жиры, г</div>
			</div>
			<div class="item">
				<div class="value">{{ coffeeItem.carbohydratesAmount && coffeeItem.carbohydratesAmount !== 'NaN' ? coffeeItem.carbohydratesAmount : 0 }}</div>
				<div class="label">Углеводы, г</div>
			</div>
		</div>
	</div>
</template>

<script>
import { IonRadioGroup, IonRadio, IonCheckbox, IonLabel, IonNote, IonList, IonItem, IonSkeletonText } from '@ionic/vue';
import { useRouter } from 'vue-router';

export default {
	props: ['coffeeItem'],
	components: {
		IonRadioGroup,
		IonRadio,
		IonCheckbox,
		IonLabel,
		IonNote,
		IonList,
		IonItem,
		IonSkeletonText
	},
	setup() {
		const router = useRouter();
		return {
			router
		}
	},
	methods: {
		setRadioOption(e) {
			const radioGroup = e.target;
			const hiddenInput = radioGroup.querySelector('input[name="'+radioGroup.name+'"]');

			hiddenInput.value = typeof radioGroup.value === 'undefined' ? '' : radioGroup.value;
		}
	}
}
</script>
