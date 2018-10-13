// app.js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const product = require('./routes/product'); // Imports routes for the products
const app = express();
const {
    PORT,
    DEV_MONGODB_URI
} = process.env;

const port = PORT || 5000;

let db;

mongoose.Promise = global.Promise;
mongoose.connect(DEV_MONGODB_URI);

db = mongoose.connection;

db.on('connected', () => console.log('Connected ', DEV_MONGODB_URI))
db.on('disconnected', () => console.log('Disconnected ..... '))
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

app.listen(port, () => {
    console.log('Server port number' + port);
});
