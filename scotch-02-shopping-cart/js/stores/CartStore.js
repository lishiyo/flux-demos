import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import FluxCartConstants from '../constants/FluxCartConstants';
import _ from 'underscore';

// Define initial data points

// Define private helper cartModel
const cartModel = {
    _products: {}, // { 'sku123': {price, qty}, 'sku456': {price, qty}}
    _cartVisible: false,
    addToCart: function(sku, updatedProd) { // key, existing product
        updatedProd.quantity = (sku in this._products ? this._products[sku].quantity + 1 : 1);
        // add one to existing product in cart, or create a new product
        this._products[sku] = _.extend({}, this._products[sku], updatedProd);
    },
    removeFromCart: function(sku) {
        delete this._products[sku];
    },
    updateCartVisible: function(cartVisible) {
        this._cartVisible = cartVisible;
    }
};

const CartStore = _.extend({}, EventEmitter.prototype, {
    // @object Selected Products
    getCartItems: function() {
        return cartModel._products;
    },

    getCartCount: function() {
        return Object.keys(cartModel._products).length;
    },

    // Cart cost total
    getCartTotal: function() {
        var total = 0;
        for (let sku in cartModel._products) { // sku variant
            if (cartModel._products.hasOwnProperty(sku)) {
                let productTotal = cartModel._products[sku].price * cartModel._products[sku].quantity;
                total += productTotal;
            }
        }

        return total;
    },

    // @boolean is the Cart Visible
    getCartVisible: function(){
       return cartModel._cartVisible;
    },

    // Emit Change event
    emitChange: function() {
       this.emit('change');
    },

    // Add change listener
    addChangeListener: function(callback) {
       this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function(callback) {
       this.removeListener('change', callback);
    }
});

CartStore.dispatcherIndex = AppDispatcher.register(payload => {
    let action = payload.action;

    const actionTypes = {
        [FluxCartConstants.CART_ADD]() { // sku, update
            cartModel.addToCart(action.sku, action.update);
        },
        [FluxCartConstants.CART_REMOVE]() { // sku
            cartModel.removeFromCart(action.sku);
        },
        [FluxCartConstants.CART_VISIBLE]() {
            cartModel.updateCartVisible(action.cartVisible);
        }
    };

    if (_.has(actionTypes, action.type)) {
        actionTypes[action.type]();
        CartStore.emitChange();
    }

    return true;
});

export default CartStore;
