import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';
import Profile from '../components/Profile';

import { Router, Route, DefaultRoute } from 'react-router';

module.exports = (
    // Main will always show
    <Route name="app" path="/" handler={Main} >
        <Route name="profile" path="profile/:username" handler={Profile} />
        // Swap out child view at RouteHandler
        <DefaultRoute handler={Home} />
    </Route>
);
