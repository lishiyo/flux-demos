var path = require('path');
var express = require('express');

// ============= App Middleware ==========
var login = require('./server/login');
var serverRouter = require('./server/routes');

var app = express();

app
  .set('view engine', 'ejs')
  .use(express.static(path.join(__dirname, 'public')))
  .use(login.routes)
  .use(serverRouter.routes)
  // pass multiple functions to route creator to run sequentially
  // login.required calls next() if valid, redirects to /login if error
  .get("*", login.loginRequired, function(req, res) { // any request not captured by static middleware
    console.log("req", req);
    res.render('index', { // views/index.ejs
      user: login.safe(req.user) // pass safe version of current user
    });
  })
  .listen(3000);

