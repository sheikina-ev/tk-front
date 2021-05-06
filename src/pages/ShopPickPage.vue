<template>
	<ion-page>
		<ion-content>
			<ion-grid>
				<ion-row class="choose-place">
					<ion-col size="12">
						<h2 class="text-center">Выберите месте, где вы<br> хотите создать заказ</h2>
					</ion-col>
					<ion-col size="12">
						<form @submit="selectShop">
							<ion-radio-group v-if="shops.length > 0" :value="activeShop ? activeShop : shops[0].id">
								<shop-item v-for="shop in shops" :key="shop.id" :shop="shop"></shop-item>
							</ion-radio-group>
							<ion-button class="btn-classic" type="submit" expand="block">Выбрать</ion-button>
						</form>
					</ion-col>
					<ion-col size="12" v-if="activeShop">
						<p>Важно: при выборе новой точки Ваша корзина будет очищена</p>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>

<script>
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonRadioGroup, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
import ShopItem from '../components/shop/ShopItem.vue';

export default {
	components: { IonPage, IonContent, IonGrid, IonRow, IonCol, IonRadioGroup, IonButton, ShopItem },
	setup() {
		const router = useRouter();
		return { router };
	},
	async mounted() {
		this.$store.dispatch('getStores');
	},
	computed: {
		shops() {
			return this.$store.getters.shops;
		},
		activeShop() {
			return this.$store.getters.activeShop;
		}
	},
	methods: {
		selectShop(e) {
			e.preventDefault();

			const form = e.target;
			const selectedRadio = form.querySelector('ion-radio[aria-checked="true"]');

			if(!selectedRadio) return false;

			this.$store.commit('selectShop', {shopId: selectedRadio.value});
			this.router.replace('/coffee');
		}
	}
}
</script>
