const express = require ('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Server
const app = express();

// Conect Mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapi', {
    useNewUrlParser: true,
});

// Enable Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// App routes
app.use('/', routes());

// Port
app.listen(5000);