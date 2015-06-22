'use strict';

var express = require('express');
var app = express();
var multer = require('multer');
var graphs = require('./routes/graphs');

app.use(express.static('public'));
app.use(multer({dest:'./temp/'}));

app.use('/graphs', graphs);



app.listen(3000, function () {
	console.log('listening on 3000');
});

