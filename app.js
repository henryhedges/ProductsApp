// app.js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const Auth0Strategy = require('passport-auth0');
const passport = require('passport');
// const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const app = express();
const product = require('./routes/product'); // Imports routes for the products

const {
    PORT,
    NODE_ENV,
    APP_SERCRET,
    DEV_MONGODB_URI,
    AUTH_DOMAIN,
    AUTH_ID,
    AUTH_CLIENT_SECRET,
} = process.env;

const port = PORT || 5000;

/**
 * Session mgmt
 */
const sess = {
    secret: APP_SERCRET,
    cookie: {},
    resave: false,
    saveUninitialized: true
};

const strategy = new Auth0Strategy({
        domain: AUTH_DOMAIN,
        clientID: AUTH_ID,
        clientSecret: AUTH_CLIENT_SECRET, // Replace this with the client secret for your app
        callbackURL: `http://localhost:${PORT}/callback`,
        state: true
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
    }
);

if (NODE_ENV === 'production') {
    sess.cookie.secure = true; // serve secure cookies, requires https
}

passport.use(strategy);

passport.serializeUser(function(user, done) {
    console.log('Serializing user....')
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    console.log('Deserializing user....')
    done(null, user);
});

/**
 * Mongoose / MongoBD initialize
 */
let db;

mongoose.Promise = global.Promise;
mongoose.connect(DEV_MONGODB_URI);

db = mongoose.connection;

db.on('connected', () => console.log('Connected ', DEV_MONGODB_URI))
db.on('disconnected', () => console.log('Disconnected ..... '))
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/** 
 * Middlewares
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.loggedIn = false

    if (req.session.passport && typeof req.session.passport.user !== 'undefined') res.locals.loggedIn = true

    next()
});

// app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/products', product);

/** LISTEN ON PORT */
app.listen(port, () => {
    console.log('Server port number' + port);
});

//passport-auth0


