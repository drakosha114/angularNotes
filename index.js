/**
 * Created by drakosha on 30.08.2016.
 */
var express;
var app;
var path;

express = require('express');
app = express();
path = require('path');

app.use(express.static(path.join(__dirname, 'app')));
app.listen(3000);