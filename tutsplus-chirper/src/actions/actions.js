'use strict';

import dispatcher from '../dispatcher';
import constants from '../constants';

// generate all actions
// exports.getChirps = function(data) 
/**
Generate all actions
    exports.chirp = function(data) {
        dispatcher.dispatch({
            actionType: CHIRP,
            data: data
        })
    }
**/
Object.keys(constants).forEach(key => {
    // camelCase
    let funcName = key.split("_").map((word, idx) => {
        if (idx === 0) return word.toLowerCase();
        return word[0] + word.slice(1).toLowerCase();
    }).join('');

    exports[funcName] = function (data) {
        dispatcher.dispatch({
            actionType: constants[key], // CHIRP
            data: data
        });
    }
});
