// routes/auth.js

const express = require('express');
const router = express.Router();
// const Auth0Strategy = require('passport-auth0')
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

function loggedIn(req, res, next) {
    console.log('checking if logged in => ')
    if (!req.user) {
        console.log('not logged in')
        next();
    } else {
        res.redirect('/user');
    }
}

// Perform the login, after login Auth0 will redirect to callback
router.get('/login',
    loggedIn,
    passport.authenticate('auth0', {scope: 'openid email profile'}), 
    function (req, res) { res.redirect("/") }
);

// Perform the final stage of authentication and redirect to '/user'
router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('callbackcalled')
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/user");
  }
);

/* GET user profile. */
router.get('/user', ensureLoggedIn, function(req, res, next) {
//   res.render('user', {
//     user: req.user ,
//     userProfile: JSON.stringify(req.user, null, '  ')
//   });
    console.log('USER ', JSON.stringify(req.user))
    res.send("Logged in");
});

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;