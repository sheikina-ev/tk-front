<template>
	<ion-content class="background-image" no-scroll>
		<ion-grid>
			<form>
				<ion-col>
					<ion-item>
						<ion-label>Login:</ion-label>
						<ion-input name="login"></ion-input>
					</ion-item>
				</ion-col>
			</form>
		</ion-grid>
	</ion-content>
</template>

<script>
import { IonContent, IonGrid, IonCol, IonItem, IonLabel, IonInput } from '@ionic/vue';

export default {
	components: {
		IonContent,
		IonGrid,
		IonCol,
		IonItem,
		IonLabel,
		IonInput
	}
}
</script>
