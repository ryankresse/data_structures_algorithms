var fileReader = require('../../helpers/fileReader');

var q = require('q');

var deferred = q.defer();

function makeGraph (file) {
	console.log(file);
	function parseLine (line) {
		var nodes = /\w+/g;
		var allNodes = line.match(nodes);
		var vertex = allNodes[0];
		var adjacentsInOrder = allNodes.slice(1).sort(function (a, b) {
			if (a < b) {
				return -1;
			}
			else if (a > b) {
				return 1;
			} 
			return 0;
		});

		return {
			id: vertex,
			a: adjacentsInOrder
		}
	}

	fileReader(file, parseLine).then(function(data){
		console.log(da
		deferred.resolve(data);
	},
	function (reason) {
		deferred.reject(reason);
	});

	return deferred.promise;
}

module.exports = makeGraph;