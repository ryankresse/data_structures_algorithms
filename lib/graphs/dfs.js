'use strict';
var initAsUnexplored = require('./helpers/initVerticesAsUnexplored');
var _ = require('lodash');

function depthFirstSearch (g, v, preOp, postOp) {
	var clock = 0;
	preOp = preOp || _.noop;
	postOp = postOp || _.noop;
	
	function visitTime(vertex, preOrPost) {
		vertex[preOrPost] = clock;
		clock += 1;
	}

	function dfs (g,v)  {
		var vertex = v;
		if (vertex.explored === false) {
			vertex.explored = true;
			visitTime(vertex, 'preVisit');
			preOp(vertex);
			vertex.a.forEach(function (adjacent){
				var graphIndexOfAdjacent = _.findIndex(g, function (vertexValue) {
					return vertexValue.id === adjacent;
				});
				console.log(graphIndexOfAdjacent);
				dfs(g, g[graphIndexOfAdjacent]);
			});
			visitTime(vertex, 'postVisit');
			postOp(vertex);
		}
	}

	dfs(g, v);
	return g;
}

module.exports = depthFirstSearch;









