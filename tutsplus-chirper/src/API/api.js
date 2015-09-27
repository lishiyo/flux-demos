import actions from '../actions/actions';
import dispatcher from '../dispatcher';
import constants from '../constants';

export default {
    fetchChirps: function() {
        get('/api/chirps')
            .then(actions.gotChirps.bind(actions));
    },
    saveChirp: function(text) {
        text = text.trim();
        if (text === '') return;

        post('/api/chirps', { text: text })
            .then(data => {
                console.log("saveChirp got data", data);
                actions.chirped.bind(actions);
            });
    }
};

/**
 ** ================== HELPERS ================== 
 */
// return promise with json response
function get(url) {
    // Fetch API returns a promise
    // without credentials param, fetch API cannot send cookies and would not know we're a logged-in user 
    return fetch(url, {
        credentials: 'same-origin'
    }).then(res => {
        return res.json();
    });
}

function post(url, dataObj) {
    return fetch(url, {
        method: 'POST',
        credentials: 'include', // include cookies
        body: JSON.stringify(dataObj || {}),
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }
    }).then(res => {
        return res.json();
    });
}
