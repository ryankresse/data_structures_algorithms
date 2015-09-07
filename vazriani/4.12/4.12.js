/* 
	finds the length of the shortest cycle that includes a specified edge
	in a undirected, weight graph
*/


var _ = require('lodash');
var makeGraph = require('../../lib/graphs/helpers/make-weighted-graph');
var dijkstra = require('../../lib/graphs/dijkstra');

function FindMinCycle(g, v1, v2) {
	var edgeWeight = findEdgeWeight(g, v1, v2);
	var gWithoutEdge = deleteEdge(g, v1, v2);
	var gWithShortestPaths = dijkstra(gWithoutEdge, v1);
	var distTov2 = _.find(gWithShortestPaths, 'id', v2).dist;
	
	this.shortestCycleLength = distTov2 + edgeWeight;	
	console.log(this.shortestCycleLength);
}

function findEdgeWeight(g, v1, v2) {
	var v1InGraph = _.find(g, 'id', v1);
	var v2AsAdjacent = _.find(v1InGraph.a, 'v', v2);
	return v2AsAdjacent.w;
}


function deleteEdge(g, v1, v2) {
	var newG = _.cloneDeep(g);
	var v1InGraph = _.find(newG, 'id', v1);
	var v2InGraph = _.find(newG, 'id', v2);
	_.remove(v1InGraph.a, 'v', v2);
	_.remove(v2InGraph.a, 'v', v1);
	return newG;
}

makeGraph('4.12.txt').then(function(g){
	var minCycle = new FindMinCycle(g, 'b', 'c');
})
.fail(function(reason)	{console.error(reason.stack);
});