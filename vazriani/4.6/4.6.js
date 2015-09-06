/* finds the number of equal shortest paths from one node to another
   in an undirected weighted graph
*/


var _ = require('lodash');
var makeGraph = require('../../lib/graphs/helpers/make-weighted-graph');
var initAsUnexplored = require('../../lib/graphs/helpers/initVerticesAsUnexplored');

function ShortestPaths (g, o, d) {
	this.min;
	this.g = initAsUnexplored(g);
	this.d = d;
	this.paths = 0;
	this.o = _.find(this.g, 'id', o);
	this.findShortestPaths(this.g, this.o, 0);
	console.log(this.min);
	console.log(this.paths);
}

ShortestPaths.prototype.findShortestPaths = function(g, v, l) {
		var self = this;
		var vertex = v;
		
		if (vertex.explored === false) {
			vertex.explored = true;	
			var graphClone = _.cloneDeep(g);
			vertex.a.forEach(function (a){
		
				if (a.v === self.d) {
					self.isMin(l + a.w);
					return;
				}

				var graphIndexOfAdjacent = _.findIndex(graphClone, function (vertexValue) {
					return vertexValue.id === a.v;
				});
				self.findShortestPaths(graphClone, graphClone[graphIndexOfAdjacent], l + a.w);
			});
		}
};

ShortestPaths.prototype.isMin = function(dist) { 
	if (!this.min) {
		this.min = dist;
		this.paths = 1;
		return;
	}

	if (dist > this.min) {
		return;
	}

	if (dist === this.min) {
		this.paths++;
		return;
	}

	if (dist < this.min) {
		this.min = dist;
		this.paths = 1;
	}

};




makeGraph('4.6.txt').then(function(g){
	var shortestPaths = new ShortestPaths(g, 'a', 'd');

})
.fail(function(reason)	{console.error(reason.stack);
});