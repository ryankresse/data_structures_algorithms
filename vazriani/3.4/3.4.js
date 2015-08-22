'use strict';
var makeGraph = require('../../lib/graphs/helpers/makeGraph');
var initAsUnexplored = require('../../lib/graphs/helpers/initVerticesAsUnexplored');
var tDfs = require('../../lib/graphs/topological_sort_dfs');
var dfs = require('../../lib/graphs/dfs');
var _ = require('lodash');

makeGraph('3.4.txt').then(function(graph){
	graph.forEach(function(v){
		v.s = null;
	});
	graph[0].s = 1;
	var isBipartite = true;
	graph.forEach(function(v){
		if (v.s) {
			for (var i = 0; i < v.a.length; i++) {
				var graphIndexOfAdjacent = _.findIndex(graph, function (vertexValue) {
					return vertexValue.id === v.a[i];
				});
				if (v.s === graph[graphIndexOfAdjacent].s) {
					isBipartite = false;
					return;
				}
				if (!graph[graphIndexOfAdjacent].s) {
					if (v.s === 1) {
						graph[graphIndexOfAdjacent].s = 2;
					} else {
						graph[graphIndexOfAdjacent].s = 1;
					}
				}
			}
		}
		else {
			var cachedS;
			for (var i = 0; i < v.a.length; i++) {
				if (!cachedS) {cachedS = v.a[i].s;}
				else {
					if (v.a[i].s === cachedS && v.a[i].s !== null) {
						isBipartite = false;
						return;
					}
				} 	
				if (cachedS === 1) {
					v.s = 2;
				} else {
					v.s = 1;
				}
			}
		}


});

console.log(isBipartite);


},
function (reason){
	throw reason;
});