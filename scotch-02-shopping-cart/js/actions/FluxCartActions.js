import AppDispatcher from '../dispatchers/AppDispatcher';
import FluxCartConstants from '../constants/FluxCartConstants';

const FluxCartActions = {
	// receive initial product data
	receiveProduct(data) {
		AppDispatcher.handleAction({
			type: FluxCartConstants.RECEIVE_DATA,
			data: data
		});
	},

	// Set currently selected product variation
	selectProduct(index) {
		AppDispatcher.handleAction({
			type: FluxCartConstants.SET_SELECTED,
			data: index
		});
	},

	addToCart(sku, update) {
		AppDispatcher.handleAction({
			type: FluxCartConstants.CART_ADD,
			sku: sku,
			update: update
		});
	},

	removeFromCart(sku) {
		AppDispatcher.handleAction({
			type: FluxCartConstants.CART_REMOVE,
			sku: sku
		});
	},

	updateCartVisible(cartVisible) {
		AppDispatcher.handleAction({
			type: FluxCartConstants.CART_VISIBLE,
			cartVisible: cartVisible
		});
	}
};

export default FluxCartActions;
