// app.js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const product = require('./routes/product'); // Imports routes for the products
const app = express();

const {
    PORT,
    NODE_ENV,
    APP_SERCRET,
    DEV_MONGODB_URI
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

if (NODE_ENV === 'production') {
    sess.cookie.secure = true; // serve secure cookies, requires https
}

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
 * Middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session(sess));
app.use('/products', product);

/** LISTEN ON PORT */
app.listen(port, () => {
    console.log('Server port number' + port);
});

