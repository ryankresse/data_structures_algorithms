var fileReader = require('../../helpers/fileReader');

var q = require('q');

var deferred = q.defer();

function makeWeightedGraph (file) {

	function parseLine (line) {
		var v = /\w+/;
		var a = /\w+:-*\d+/g;
		var aId = /[^:]+/;
		var weight = /:-*\w+/;
		var	vertex = v.exec(line)[0];	
		var adjacents = line.match(a);
		
		if (adjacents) { 
			adjacents = adjacents.map(function(a) {
				var id = aId.exec(a)[0];
				if (!isNaN(parseInt(id))) id = parseInt(id);			
				var edgeWeight = parseInt(weight.exec(a)[0].slice(1));
				return {
					v: id,
					w: edgeWeight
				};
			});

			adjacents = adjacents.sort(function (a, b) {
				if (a.v < b.v) {
					return -1;
				}
				else if (a.v > b.v) {
					return 1;
				} 
				return 0;
			});
		}
		
		return {
			id: vertex,
			a: adjacents
		}
	}

	fileReader(file, parseLine).then(function(data){
		deferred.resolve(data);
	},
	function (reason) {
		deferred.reject(reason);
	});

	return deferred.promise;
}

module.exports = makeWeightedGraph;