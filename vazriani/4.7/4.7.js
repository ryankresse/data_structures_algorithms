/* 
determines if a tree is a shortest path tree of a graph
*/
var Q = require('q');

var _ = require('lodash');
var makeGraph = require('../../lib/graphs/helpers/make-weighted-graph');
var BellManFord = require('../../lib/graphs/bellman-ford');

function IsShortestPathTree(g,t) {
	var sortedG = sortG(g);
	var sortedT = sortG(t);
	this.isShortestPathTree = true;
	for (var i = 0; i < sortedG.length; i++) {
		if (sortedG[i].dist !== sortedT[i].dist) {
			this.isShortestPathTree = false;
		}
	} 
	console.log(this.isShortestPathTree);
}

function sortG(g) {
	return g.g.sort(function(v1, v2){
			if ( v1 > v2) {
				return -1;
			}
			if ( v1 < v2) {
				return 1;
			}
			return 0;
		});
}


Q.allSettled([makeGraph('4.7_g.txt'), makeGraph('4.7tree.txt')])
	.then(function(results){
		var bf = new BellManFord(results[0].value, 'a');
		var tf = new BellManFord(results[1].value, 'a');
		var isSPT = new IsShortestPathTree(bf, tf);
	})
	.fail(function(reason){
		console.log(reason);
	});


