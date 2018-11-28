'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/product.route');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://some-mongo/products';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

app.get('/', (req, res) => {
  res.send('Hello world!\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
