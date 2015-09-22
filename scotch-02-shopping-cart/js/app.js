import React from 'react';
import ProductData from './ProductData';
import CartAPI from './utils/CartAPI';
import FluxCartApp from './components/FluxCartApp.react';

/** BOOTSTRAP App **/

// Load mock product Data into localStorage
ProductData.init();

// Load mock API call
CartAPI.getProductData();

// Render FluxCartApp Controller View
React.render(
	<FluxCartApp />,
	document.getElementById('flux-cart')
);
