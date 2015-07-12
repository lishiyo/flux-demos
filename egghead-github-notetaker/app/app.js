/** Router */

import React from 'react';
import Router from 'react-router';
import routes from './config/routes';
import Debug from 'debug';

Debug.enable('http');

// default is Router.HashLocation
Router.run(routes, (Root, state) => {
	// state has path, route params - take properties on state and copy to Root component's this.prosp
    React.render(<Root {...state} />, document.getElementById('app'));
});
