import actions from '../actions/actions';
import dispatcher from '../dispatcher';
import constants from '../constants';
import API from './api';

// register a handler to dispatch types
dispatcher.register(action => {
    switch (action.actionType) {
        case constants.CHIRP:
            API.saveChirp(action.data);
            break;
    }
});

export default API;
