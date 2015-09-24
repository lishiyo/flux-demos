'use strict';

import flux from 'flux';

let dispatcher = new flux.Dispatcher();

// run every time dispatcher receives an action
dispatcher.register(function(action) {
    console.log(action);
});

export default dispatcher;
