import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import FluxCartConstants from '../constants/FluxCartConstants';
import _ from 'underscore';

// Define initial data poitns
// let _product = {},
// 	_selected = null;

// Define private helper productModel
const productModel = {
    // Method to load product data from mock API
    loadProductData(data) { // RECEIVE_DATA
        this._product = data[0]; // beer is first in array
        this._selected = data[0].variants[0]; // first variant of SKU
    },
    // Method to set the currently selected product variation
    setSelected(index) {
        this._selected = this._product.variants[index];
    },
    _product: {},
    _selected: null
};

// ProductStore's getters and setters
// Extend ProductStore with EventEmitter to add eventing capabilities
const ProductStore = _.extend({}, EventEmitter.prototype, {
    // Return Product data
     getProduct: function() {
       return productModel._product;
     },

     // Return selected Product
     getSelected: function(){
       return productModel._selected;
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

// Register callback with AppDispatcher
ProductStore.dispatcherIndex = AppDispatcher.register(payload => {
    let action = payload.action;

    const actionTypes = {
        [FluxCartConstants.RECEIVE_DATA]() {
            productModel.loadProductData(action.data);
        },
        [FluxCartConstants.SET_SELECTED]() {
            productModel.setSelected(action.data);
        }
    };

    if (_.has(actionTypes, action.actionType)) {
        actionTypes[action.actionType]();
        ProductStore.emitChange();
    }

    return true;
});

export default ProductStore;
