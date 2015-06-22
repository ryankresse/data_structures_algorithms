'use strict';
var lineReader = require('line-reader'),
	Q 		   = require('q');		
// read all lines:

exports = module.exports = returnArrayOfLinesFromFile;

function returnArrayOfLinesFromFile (file, cb) {
	var deferred = Q.defer();
	lineReader.eachLine(file, function(line) {
		cb(line);
	}).then(function () {
	  deferred.resolve();
	});
	return deferred.promise;
}
