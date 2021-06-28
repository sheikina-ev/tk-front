<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/coffee" text="" :icon="chevronBack"></ion-back-button>
				</ion-buttons>
				<ion-title>{{ coffeeItem && Object.keys(coffeeItem).length > 0 ? coffeeItem.product_name : 'Загрузка...' }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<form id="coffee-detail">
				<coffee-overview :coffeeItem="coffeeItem"></coffee-overview>
			</form>
		</ion-content>
		<ion-footer>
			<ion-toolbar class="overview-footer" color="light">
				<ion-button :disabled="coffeeItem && coffeeItem.price > 0 ? `false` : `true`" @click="addToCart" expand="block" type="submit" color="primary">
					<div class="content">
						<span><ion-icon :icon="cartOutline"></ion-icon>Заказать</span>
						<span>{{ coffeeItem.price }} руб.</span>
					</div>
				</ion-button>
			</ion-toolbar>
		</ion-footer>
	</ion-page>
</template>

<script>
import { IonPage, IonHeader, IonTitle, IonContent, IonToolbar, IonBackButton, IonButtons, IonFooter, IonIcon, IonButton, toastController } from '@ionic/vue';
import { chevronBack, cartOutline } from 'ionicons/icons';
import CoffeeOverview from '../components/coffee/CoffeeOverview.vue';
import { useRouter } from 'vue-router';

export default {
	components: {
		IonPage,
		IonHeader,
		IonTitle,
		IonContent,
		IonToolbar,
		IonButtons,
		IonBackButton,
		CoffeeOverview,
		IonFooter,
		IonIcon,
		IonButton
	},
	data() {
		return {
			productId: this.$route.params.id
		}
	},
	setup() {
		const router = useRouter();
		return {
			router,
			chevronBack,
			cartOutline
		}
	},
	async mounted() {
		this.$store.commit('clearState', 'product');

		const response = this.$store.dispatch('getProduct', {params: {id: this.productId}});

		if(response) {
			// All good
		} else {
			// Not good
		}
	},
	computed: {
		coffeeItem() {
			var product = this.$store.getters.product;
			if(product) {
				product.carbohydratesAmount = parseFloat(product.carbohydratesAmount).toFixed(1);
				product.energyAmount = parseFloat(product.energyAmount).toFixed(1);
				product.fatAmount = parseFloat(product.fatAmount).toFixed(1);
				product.proteinsAmount = parseFloat(product.proteinsAmount).toFixed(1);
			}

			return product;
		}
	},
	methods: {
		async addToCart() {
			// e.preventDefault();

			var params = {};
			const form = document.getElementById('coffee-detail');
			const formData = new FormData(form);
			const toast = await toastController.create({
				message: 'Товар добавлен в корзину',
				position: 'bottom',
				cssClass: 'toast-mb',
				mode: 'md',
				duration: 3000
			});

			for(var pair of formData.entries()) {
				if(pair[1] == '') continue;
				
				if(params[pair[0]] !== undefined) {
					if(typeof params[pair[0]] === 'string') {
						params[pair[0]] = [params[pair[0]], pair[1]];
					} else {
						params[pair[0]].push(pair[1]);
					}
				} else {
					params[pair[0]] = [pair[1]];
				}
			}

			this.$store.dispatch('addToCart', params);
			await toast.present();
			this.router.go(-1); // Might need to check if previous page is equal to '/coffee' (TODO)
		}
	}
}
</script>
