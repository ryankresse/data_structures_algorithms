/*
Finds connected components in directed graph
*/

'use strict';
var makeGraph = require('../../lib/graphs/helpers/makeGraph');
var reverseEdges = require('../../lib/graphs/helpers/reverseEdges');
var initAsUnexplored = require('../../lib/graphs/helpers/initVerticesAsUnexplored');
var tDfs = require('../../lib/graphs/topological_sort_dfs');
var dfs = require('../../lib/graphs/dfs');
var _ = require('lodash');
var connComps = [];
var compIndex = -1;

function markComp () {
	var cc = compIndex;
	return function (v) {
		v.cc = cc;
	}
}

makeGraph('3.3.b.txt').then(function(graph){
	graph = initAsUnexplored(graph);
	var reversedGraph = reverseEdges(graph);
	var graphWithOrderings = tDfs(reversedGraph, reversedGraph[0]);
	var graphIdsRevSorted = graphWithOrderings.sort(function(a, b) {
		return b.postVisit - a.postVisit;
	}).map(function(v){
		return v.id;
	});
	
	graphIdsRevSorted.forEach(function(vertex){
		var graphIndex = _.findIndex(graph, function(v) {
			return v.id == vertex;
		});
		compIndex +=1;
		var compClosure = markComp();	
		depthFirstSearch(graph, graph[graphIndex], compClosure);
	});
	
	var connectedComponentsArray = (graph.sort(function(a,b){
		return a.cc - b.cc;
	}).map(function(v){
		return {
			id: v.id,
			cc: v.cc
		}
	}));
	console.log(connectedComponentsArray);
},
function(reason) {
	console.log(reason);
});



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
				dfs(g, g[graphIndexOfAdjacent]);
			});
			visitTime(vertex, 'postVisit');
			postOp(vertex);
		}
	}
	dfs(g, v);
	return g;
}
