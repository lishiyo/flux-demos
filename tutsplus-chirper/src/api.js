import actions from './actions/actions';

export default {
    fetchChirps: function() {
        get('/api/chirps').then(actions.gotChirps.bind(actions));
    }
};

// return promise with json response
function get(url) {
    // Fetch API returns a promise
    // without credentials option, the API would not know we're a logged-in user - login.required would return the login-page
    return fetch(url, {
        credentials: 'same-origin'
    }).then((res) => {
        return res.json();
    });
}
