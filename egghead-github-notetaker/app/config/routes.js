import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';
import Profile from '../components/Profile';
import FollowWidget from '../components/Widget/Follow';

import { Route, DefaultRoute } from 'react-router';

export default (
    // Main Component will always show
    // Will swap out child view at RouteHandler
    <Route name="app" path="/" handler={ Main } >

    /** Routes **/
        <Route name="profile" path="profile/:username" handler={ Profile } />
        <Route name="followWidget" path="follow" handler={ FollowWidget } />
        <DefaultRoute handler={ Home } />
    </Route>
);
