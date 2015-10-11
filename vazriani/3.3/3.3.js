/*
Finds connected components in directed graph
*/

'use strict';
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
