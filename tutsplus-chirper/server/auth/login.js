import passport from 'passport';
import LocalStrategy from 'passport-local';
import crypto from 'crypto';
import _ from 'lodash';

// Mimic MongoDB
import LocallyDB from 'locallydb';
const db = new LocallyDB('./.data');

// Collections
const users = db.collection('users'); //create collection

// ================== STRATEGIES ==================

passport.use(new LocalStrategy( (username, password, onDone) => {
    let user = users.where({ 
        username: username, 
        passwordHash: hash(password) 
    }).items[0];

    if (user) {
        onDone(null, user);
    } else {
        onDone(null, false);
    }
}));

passport.serializeUser( (user, onDone) => {
    // convert User to a smaller object for reference
    onDone(null, user.cid);
});

passport.deserializeUser( (cid, onDone) => { // take serialized form
    onDone(null, users.get(cid));
});

// ========= SERVER ROUTES ===========

const router = require('express').Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

// parse any url-encoded bodies on the POST request
// LOGIN page - parse username and password into objects
router.use(bodyParser.urlencoded({ extended: true }));  
// parse JSON bodies and convert into object 
// chirps will be sent as JSON to server
router.use(bodyParser.json()); 
router.use(cookieParser());
router.use(expressSession({
    secret: 'awo;eijfa;owijf;aiwejf;', // random auth
    resave: false,
    saveUninitialized: true
}));

// Set up Passport session
router.use(passport.initialize());
router.use(passport.session());

// ================= HELPERS ===============

// hash password before storing, then hash passed-in password to compare them
function hash(password) { 
    return crypto.createHash('sha512').update(password).digest('hex');
}

function loginRequired(req, res, next) {
    if (req.isAuthenticated()) { // magic password
        next();
    } else {
        res.redirect('/login');
    }
}

function makeUserSafe(user) { // filter out JSON from LocallyDB
    let safeKeys = ['cid', 'fullname', 'email', 'username', 'following']; // whitelist
    return _.pick(user, safeKeys);
}

export default {
    routes: router,
    users: users,
    makeUserSafe: makeUserSafe,
    required: loginRequired,
    hash: hash
};
