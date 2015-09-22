// Mock API - grab from localStorage

import FluxCartActions from '../actions/FluxCartActions';

const API = {
	getProductData() {
		// Load mock product data from localStorage into ProductStore via Action
		const data = JSON.parse(localStorage.getItem('product'));
		FluxCartActions.receiveProduct(data);
	}
};

export default API;
