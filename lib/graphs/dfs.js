'use strict';
var initAsUnexplored = require('./helpers/initVerticesAsUnexplored');
var _ = require('lodash');
function depthFirstSearch (g, v, preOp, postOp) {
	var clock = 0;
	preOp = preOp || _.noop;
	postOp = postOp || _.noop;

	g = initAsUnexplored(g);
	
	function visitTime(vertex, preOrPost) {
		console.log(vertex);
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
				})
				dfs(g, g[graphIndexOfAdjacent]);
			});
			visitTime(vertex, 'postVisit');
			postOp(vertex);
		}
	}

	g = initAsUnexplored(g);
	dfs(g, v);
	return g;
}

module.exports = depthFirstSearch;








