'use strict';
var initAsUnexplored = require('./helpers/initVerticesAsUnexplored');
var BinaryHeap = require('../binary-heap');
var _ = require('lodash');
var makeGraph = require('./helpers/make-weighted-graph');

makeGraph('weight-text.txt').then(function(data) {
	dijkstra(data, 'a');

})
.fail(function(error){
	console.error(error.stack);
});

function dijkstra(graph, originId) {
	graph.forEach(function(v) {
		v.dist = 1000000;
		v.prev = null;
	});
	var origin = _.find(graph, 'id', originId);
	origin.dist = 0;

	var queue = new BinaryHeap(graph, 'dist');
	while (queue.heap.length > 1) {	
		if (queue.heap.length === 2 && queue.heap[1] === undefined) {
			break;
		}
		var v = queue.delMin()[0];
		if (v && v.a) {
			v.a.forEach(function(a) {
				var aInGraph = _.find(graph, 'id', a.v);
				if (aInGraph.dist > (v.dist + a.w)) {
					aInGraph.dist = v.dist + a.w;
					aInGraph.prev = v.id;
					queue.decreaseKey(aInGraph);
				}
			});
		}
	}
	console.log(queue);
	console.log(graph);

	

}

module.exports = dijkstra;









