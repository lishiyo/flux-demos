'use strict';

// name : actionType
export default {
    CHIRP: 'CHIRP', // client sends chirp to server
    CHIRPED: 'CHIRPED', // chirp has been saved - server to client
    GOT_CHIRPS: 'GOT_CHIRPS',

    GOT_CURRENT_USER: 'GOT_CURRENT_USER',
    GOT_USERS: 'GOT_USERS',

    FOLLOW: 'FOLLOW',
    FOLLOWED: 'FOLLOWED',
    UNFOLLOW: 'UNFOLLOW',
    UNFOLLOWED: 'UNFOLLOWED',
};

