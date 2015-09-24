import React from 'react';
import ReactRouter, { Route } from 'react-router';

import API from './api';
import ChirpStore from './stores/chirps';

import App from './components/App';

const routes = (
    <Route handler={ App }> </Route>
);

API.fetchChirps();

ReactRouter.run(routes, ReactRouter.HistoryLocation, function(Handler) {
    React.render(<Handler />, document.getElementById('app'));
});
