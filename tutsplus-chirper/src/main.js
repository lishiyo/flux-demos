import React from 'react';
import ReactRouter, { Route } from 'react-router';

import API from './API/index';
import ChirpStore from './stores/chirps';

import App from './components/App';
import Home from './components/Home';

const routes = (
    // App route will run for all routes
    <Route handler={ App }>
        <Route name='home' path='/' handler={ Home } />
    </Route>
);

API.fetchChirps();

ReactRouter.run(routes, ReactRouter.HistoryLocation, function(Handler) {
    React.render(<Handler />, document.getElementById('app'));
});
