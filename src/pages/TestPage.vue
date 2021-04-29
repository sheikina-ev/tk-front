<template>
	<base-layout page-title="Тестовая страница">
		<ion-input id="string"></ion-input>
		<ion-button expand="full" @click="writeString">Write string</ion-button>
		<ion-button expand="full" @click="showString">Show string</ion-button>
		<ion-text>String: <span id="text-node"></span></ion-text>
	</base-layout>
</template>

<script>
import { IonInput, IonButton, IonText } from '@ionic/vue';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

export default {
	components: {
		IonInput,
		IonButton,
		IonText
	},
	methods: {
		async writeString() {
			const input = document.getElementById('string');
			
			await Storage.set({
				key: 'string',
				value: input.value
			});

			this.string = await Storage.get({key: 'string'});
		},
		async showString() {
			const textNode = document.getElementById('text-node');

			const { value } = await Storage.get({
				key: 'string'
			});

			textNode.innerText = value;
		}
	}
}
</script>
