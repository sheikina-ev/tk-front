<template>
	<ion-page id="main">
		<ion-content class="background-image" no-scroll>
			<div class="center-content flex-center">
				<img src="../assets/img/icon.svg" />
				<ion-text color="light"><h3 id="splash-message">Авторизация...</h3></ion-text>
			</div>
		</ion-content>
	</ion-page>
</template>

<script>
import { IonPage, IonContent, IonText } from '@ionic/vue';
import { useRouter } from 'vue-router';
const timeout = 2000;

export default {
	components: {
		IonPage, IonContent, IonText
	},
	setup() {
		const router = useRouter();

		setTimeout(() => {
			document.getElementById('splash-message').classList.add('show');
		}, timeout);

		return {
			router
		};
	},
	async mounted() {
		// Temporary thing
		setTimeout(async () => {
			const data = await this.$store.dispatch('auth');
	
			if(data) {
				this.router.replace('/shop');
			} else {
				this.router.replace('/auth');
			}
		}, timeout);
	}
}
</script>
