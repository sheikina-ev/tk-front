import api from './api.js';

export default {
	login(params) {
		return api.get('login', params);
	},
	requestConfirmationCode(params) {
		return api.get('sms', params);
	},
	sendConfirmationCode(params) {
		return api.get('sms/check', params);
	},
	getCategories() {
		return api.get('catalog/getCategories');
	},
	getProducts(params) {
		return api.get('catalog/getProducts', params);
	},
	getProduct(params) {
		return api.get('catalog/getProduct', params);
	},
	getStores() {
		return api.get('catalog/getStores');
	},
	getOrderHistory(phone) {
		return api.get('order/history/' + phone);
	},
	sendOrder(params) {
		return api.post('order/get', params);
	},
	checkOrder(params) {
		return api.get('order/status', params) // guid=qweqwe
	}
}