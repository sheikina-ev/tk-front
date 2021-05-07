<template>
	<ion-page id="main">
		<ion-content class="background-image" no-scroll>
			<div class="center-content">
				<ion-img src="../assets/img/icon.svg"></ion-img>
			</div>
		</ion-content>
	</ion-page>
</template>

<script>
import { IonPage, IonContent, IonImg } from '@ionic/vue';
import { useRouter } from 'vue-router';

export default {
	components: {
		IonPage, IonContent, IonImg
	},
	setup() {
		const router = useRouter();
		return {
			router
		};
	},
	beforeCreate() {
		if(this.$store.getters.isAuthorized) {
			this.router.replace('/shop');
		} else {
			this.router.replace('/auth');
		}
	},
}
</script>
