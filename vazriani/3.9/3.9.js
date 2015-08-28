/*
Finds twodegree (sum of the degress of a vertex's neighbor) of each vertex in a graph
*/


'use strict';
var makeGraph = require('../../lib/graphs/helpers/makeGraph');

var _ = require('lodash');

makeGraph('3.9.txt').then(function(graph){
	var finder = new FindTwoDegree();
	finder.find(graph);
	console.log(graph);

});

function FindTwoDegree () {
	this.cache = {};
}

FindTwoDegree.prototype.find = function (graph) {
	var self = this;
	graph.forEach(function (v) {
		v.twoDegree = 0;
		v.a.forEach(function(neighbor) {
			if (self.cache[neighbor]) {
				v.twoDegree += self.cache[neighbor];
			} 
			else {
				var graphIndexOfNeighbor = _.findIndex(graph, function (vertexValue) {
					return vertexValue.id === neighbor;
				});
				var neighborDegrees = graph[graphIndexOfNeighbor].a.length;
				v.twoDegree += neighborDegrees;
				self.cache[neighbor] = neighborDegrees;
			}
		});
	});
};
