const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));


// TODO: Write routes

module.exports = app;
