'use strict';
var lineReader = require('line-reader'),
	Q 		   = require('q');		
// read all lines:

exports = module.exports = returnArrayOfLinesFromFile;

function returnArrayOfLinesFromFile (file, cb) {
	var deferred = Q.defer();
	var data = [];
	lineReader.eachLine(file, function(line) {
		var dataFromLine = cb(line);
		if (dataFromLine) {data.push(dataFromLine)};
	}).then(function () {
	  deferred.resolve(data);
	});
	return deferred.promise;
}
