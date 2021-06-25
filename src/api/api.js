import { toastController } from '@ionic/vue';
import axios from 'axios';

let instance = axios.create({
	baseURL: 'https://вход.территориякофе.рф/api/',
	timeout: 10000,
	validateStatus: function(status) {
		return status < 500;
	}
});

instance.interceptors.request.use(request => {
	request.headers.common['Accept'] = 'application/json';
	request.headers.common['Content-Type'] = 'application/json';
	return request;
}, async error => {
	let toast = await toastController.create({
		message: 'Непредвиденная ошибка',
		duration: 3000
	})
	toast.present();
	return Promise.reject(error);
});

instance.interceptors.response.use(
	response => { return response; },
	async error => {
		let toast = await toastController.create({
			message: 'Непредвиденная ошибка',
			duration: 3000
		})
		toast.present();
		return Promise.reject(error);
	}
);

export default instance;