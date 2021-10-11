
const express = require('express');
const router = require('./htmlroutes.js')
const app = express();
app.use('/', router);


module.exports = app;
