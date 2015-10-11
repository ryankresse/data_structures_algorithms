'use strict';
var BinaryHeap = require('../binary-heap');
var _ = require('lodash');

function prim(graph) {
  var mst = [];
  graph = initCostAndPrev(graph);
  var origin = graph[0];
	origin.cost = 0;

	var queue = new BinaryHeap(graph, 'cost');
  while (queue.heap.length > 1) {
		if (queue.heap.length === 2 && queue.heap[1] === undefined) {
			break;
		}
		var v = queue.delMin()[0];
    var id = v.id;
    var prev = _.find(graph, 'id', id).prev || null;
    mst.push({id: id, prev: prev, cost: v.cost});

     if (v && v.a) {
			v.a.forEach(function(a) {
				var aInGraph = _.find(graph, 'id', a.v);
				if (aInGraph.cost > a.w && !_.find(mst, 'id', a.v)) {
					aInGraph.cost = a.w;
					aInGraph.prev = v.id;
          queue.decreaseKey(aInGraph);
				}
			});
		}
	}
  return createResults(mst);
}


function initCostAndPrev (graph) {
  return graph.map(function(v) {
    v.cost = 1000000;
    v.prev = null;
    return v
  });

}

function createResults(mst) {
  var toReturn = {};
  toReturn.cost = mst.reduce(function(prev, node) {
    return prev + node.cost;
  },0);

  toReturn.path = mst.map(function(node){
    delete node.cost;
    return node;
  });
	return toReturn;
}

module.exports = prim;
