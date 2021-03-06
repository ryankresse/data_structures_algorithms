var fileReader = require('./../helpers/fileReader');
var initAsUnexplored = require('./helpers/initVerticesAsUnexplored');
var parseLineIntoVertex = require('./helpers/parseLineIntoVertex');

var file = process.argv[2];
var startVertex = process.argv[3];
var endVertex = process.argv[4];
var data = [];
exports.shortestPath = shortestPath;

if (process.env.NODE_ENV !== "test") {
	fileReader(file, parseLineIntoVertex)
		.then(function (data) {
			console.log(shortestPath(data, startVertex, endVertex));
		}); 	
}

function shortestPath(g, v, v2) {
	if (v.length && v2.length) {
		v = Number(v);
		v2 = Number(v2);
	}
	
	if (v === v2) {
		return 0;
	}

	function areInputsinvalid (g, v, v2) {

		var notWholeNum = /[^\d+]/;
		if (!g.length) {
			return "graph can't be empty";
		}
		if ( !v.toString().length           ||
			 !v2.toString().length          ||
			notWholeNum.test(v.toString())  ||
		    notWholeNum.test(v2.toString()) ||
		    v > g.length - 1   		        ||
		    v2 > g.length -1   		        ||
		    v2 < 0             	            ||
		    v < 0
       		   ) {
			return "invalid vertex";
		}
		
		return false;
	}	
	
		
	function initAsUnexplored(g) {
		return g.map(function (vertex) {
			var adjacents = vertex;
			vertex = {};
			vertex.explored = false;
			vertex.adjacents = adjacents;
			vertex.dist = undefined;
			return vertex;
		});
	}

	var invalidInput = areInputsinvalid(g,v,v2);
	if (invalidInput) {return invalidInput};
	
		
	g  = initAsUnexplored(g);
	var queue = [];
	queue.push(v);
	g[v].dist = 0;
	while (queue.length) {
		var vert = queue.shift();

		if (g[vert].explored) {
			continue;
		}
			
		for (var i = 0; i < g[vert].adjacents.length; i++) {
			var adjacent = g[vert].adjacents[i];
			if (g[adjacent].dist == undefined) {
				g[adjacent].dist = g[vert].dist + 1;		
				if (adjacent === v2) {
					//console.log("found it");
					return g[adjacent].dist;
				}
			}	
		}
				
		queue = queue.concat(g[vert].adjacents);
			
		g[vert].explored = true;
	}						
		

	return "There\'s no path from "  + v + " to " + v2 + ".";


}


		
	
	


