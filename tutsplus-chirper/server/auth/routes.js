import passport from 'passport';
import { Router } from 'express';
import { users, hash } from './login';

const router = Router();

// ========== Auth ===========

router.get('/login', (req, res) => {
    res.render('login'); // views/login.ejs
});

router.post('/signup', (req, res, next) => { // POST bodies are parsed
    if (users.where({ username: req.body.username }).items.length === 0) {
        // no user
        let user = {
            fullname: req.body.fullname,
            email: req.body.email,
            username: req.body.username,
            passwordHash: hash(req.body.password),
            following: []
        };

        let userId = users.insert(user);
        // Auto login on signup
        req.login(users.get(userId), err => {
            if (err) { 
                return next(err);
            }
            res.redirect('/');
        });
    } else {
        console.log(" user already exists ");
        res.redirect('/login');
    }
});

// authenticate() will use some strategy
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

export default router;
