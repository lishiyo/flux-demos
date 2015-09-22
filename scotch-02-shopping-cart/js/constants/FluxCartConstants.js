import keyMirror from 'keymirror';
import _ from 'underscore';

// Define action constants
const actions = keyMirror({
  CART_ADD: null,       // Adds item to cart
  CART_REMOVE: null,    // Remove item from cart
  CART_VISIBLE: null,   // Shows or hides the cart
  SET_SELECTED: null,   // Selects a product option
  RECEIVE_DATA: null    // Loads our mock data,
});

console.log("all in constants", Object.keys(actions));

module.exports = _.extend({}, actions, {
    all: Object.keys(actions)
});
