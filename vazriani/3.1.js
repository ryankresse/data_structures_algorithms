'use strict';
//var initAsUnexplored = require('./lib/graphs/helpers/initVerticesAsUnexplored');
var makeGraph = require('../lib/graphs/helpers/makeGraph');
var dfs = require('../lib/graphs/dfs');
makeGraph('3.1.txt').then(function(graph){
	dfs(graph, graph[0]);
	console.log(graph);
},
function(reason) {
	console.log(reason);
});








