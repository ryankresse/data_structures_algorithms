'use strict';

var express = require('express');
var app = express();
var multer = require('multer');
var fs = require('fs');
var childP = require('child_process');

app.use(express.static('public'));
app.use(multer({dest:'./temp/'}));
app.post('/addFile', function (req, res) {
	console.log(req.files);
	var pathToFile = req.files.filedata.path;
	console.log(pathToFile);
	var child = childP.exec('node graphs/connectedComponents.js ' + pathToFile, function (err, stdout, stderr) {
		if (err) {
			console.log(err);	
			res.status(400).send(err) 
		
		}
		if (stderr) {
			console.log(stderr);	
			res.status(400).send(stderr) 
		} 
		if (stdout) {
			console.log(stdout);	
			res.status(200).send(stdout);
		}	
		fs.unlink(pathToFile, function (err){
			if (err) console.log(err);
		});

	});


});

app.listen(3000, function () {
	console.log('listening on 3000');
});

