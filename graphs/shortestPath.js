var graph = [ [1,2],
	      [0,3],
	      [0,4],
	      [1, 4, 5],
	      [2,3,5],
	      [3,4]
	    ];


var fileReader = require('./../fileReader');
var file = process.argv[2];
var startVertex = process.argv[3];
var endVertex = process.argv[4];
var data = [];

fileReader(file, makeData)
	.then(function () {
		//console.log(data);
		console.log(shortestPath(data, startVertex, endVertex));
	}); 	





function makeData(line) {
	var regex = /\d+/g;
	var arr = [];
	var numbers = line.match(regex);	
	if (numbers) {
		numbers.forEach(function (num) {
			arr.push(parseInt(num));
		});
		
	data.push(arr);
	}
}
function shortestPath(g, v, v2) {
	v = Number(v);
	v2 = Number(v2);
	
	function areInputsinvalid (g, v, v2) {

		var notWholeNum = /[^\d+]/;
		if (notWholeNum.test(v.toString())  ||
		    notWholeNum.test(v2.toString()) ||
		    v > g.length - 1   		    ||
		    v2 > g.length -1   		    ||
		    v2 < 0             	            ||
		    v < 0
       		   ) {
			return "invalid vertex";
		}
		if (!g.length) {
			return "graph can't be empty";
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
		

	return "There's no path from "  + v + " to " + v2 + ".";


}


		
	
	

