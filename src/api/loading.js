import { loadingController } from '@ionic/vue';

export default {
	async loading() {
		const loading = await loadingController.create({
			cssClass: 'loading-obj',
			message: 'Пожалуйста подождите...'
		});

		loading.present();
		return loading;
	}
}