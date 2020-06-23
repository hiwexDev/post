import axios from 'axios';
import { Service } from 'axios-middleware';

const base = 'https://us-central1-blog-6e77a.cloudfunctions.net/';

class Register {
	constructor() {
		if (typeof Register.instance === 'object') return Register.instance;
		Register.instance = this;
	}

	onResponse(response) {
		const res = JSON.parse(response.data);
		return res;
	}
}

class Request {
	constructor(url, baseURL) {
		this.url = url;
		this.baseURL = baseURL || base;
		this.request = axios.create({ baseURL: this.baseURL });
		const service = new Service(this.request);
		service.register(new Register());
		this.custom = axios;
	}

	get() {
		return this.request({ url: this.url });
	}

	getOne(id) {
		return this.request({ url: this.url + '/' + id });
	}

	post(value) {
		return this.request({ url: this.url, data: value, method: 'post' });
	}

	put(value, id) {
		return this.request({ url: this.url + '/' + id, data: value, method: 'put' });
	}

	delete(id) {
		return this.request({ url: this.url + '/' + id, method: 'delete' });
	}
}

export default Request;
