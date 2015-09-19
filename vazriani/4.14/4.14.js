/* 
	finds the length of the shortest cycle that includes a specified edge
	in a undirected, weight graph
*/

'use strict';
var _ = require('lodash');
var makeGraph = require('../../lib/graphs/helpers/make-weighted-graph');

var BinaryHeap = require('../../lib/binary-heap');
var dijkstra = require('../../lib/graphs/dijkstra');

function ShortestPathsThrough(intermediateNodeId, g) {
	this.g = _.cloneDeep(g);
	this.intermediateNodeId = intermediateNodeId;
	this.distsToAndFromintermediate = this.findAllDistBothDirections(this.intermediateNodeId);
	this.shorestDists = this.findShortestDistForAllPairs(_.cloneDeep(this.g));
	console.log(this.shorestDists);
}


ShortestPathsThrough.prototype.findDistBothDirections = function(node1, node2) {
	var toReturn = {};
	toReturn.node = node1;
	toReturn.nodeTointermediate = dijkstra(_.cloneDeep(this.g), node1, node2);
	toReturn.intermediateToNode = dijkstra(_.cloneDeep(this.g), node2, node1);
	return toReturn;
};

ShortestPathsThrough.prototype.findAllDistBothDirections = function(intermediateNodeId) {
	var self = this;
	var distances = [];
	this.g.forEach(function(node){
		distances.push(self.findDistBothDirections(node.id, intermediateNodeId));
	});
	return distances;
};


ShortestPathsThrough.prototype.findShortestDistForAllPairs = function(g) {
	var self = this;
	var shortestDistances = {};
	g.forEach(function(node1){
			g.forEach(function(node2){
			if (node1.id === node2.id) return;
			if (shortestDistances[self.makeKey(node2.id, node1.id)]) return; 
			var shortestDist = self.findShortestDistForPair(node1.id, node2.id);
			shortestDistances[self.makeKey(node1.id, node2.id)] = shortestDist;
			});
			
	
	});
	return shortestDistances;
};

ShortestPathsThrough.prototype.findShortestDistForPair = function(node1, node2, shortestDistances) {
	var self = this;
	var node1intermediateDists = _.find(this.distsToAndFromintermediate, 'node',  node1);
	var node2intermediateDists = _.find(this.distsToAndFromintermediate, 'node', node2);
	var distNode1ToNode2 = node1intermediateDists.nodeTointermediate + node2intermediateDists.intermediateToNode;
	var distNode2ToNode1 = node2intermediateDists.nodeTointermediate + node1intermediateDists.intermediateToNode;
	return Math.min(distNode1ToNode2, distNode2ToNode1);
};

ShortestPathsThrough.prototype.makeKey = function(node1, node2) {
	return node1 + '-' + node2;
};




makeGraph('4.14.txt').then(function(g){
	var ans = new ShortestPathsThrough('f', g);
})
.fail(function(reason)	{console.error(reason.stack);
});