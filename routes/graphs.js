'use strict';
var express = require('express');
var router = express.Router();
var createChildProcess = require('./../lib/createChildProcess');

module.exports = router;

router.post('/connectedComponents', function (req, res) {
	var pathToDataFile = req.files.filedata.path;
	createChildProcess(req, res, 'lib/graphs/connectedComponents.js', pathToDataFile);
});

router.post('/shortestPath', function (req, res) {
	var pathToDataFile = req.files.filedata.path;	
	var startVertex = Number(req.body.v1);
	var endVertex = Number(req.body.v2);
	createChildProcess(req, res, 'lib/graphs/shortestPath.js', pathToDataFile, [startVertex, endVertex]);
});