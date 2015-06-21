
var fileReader = require('./../fileReader');
var file = process.argv[0];
var data = [];

fileReader(process.argv[2], makeData)
	.then(function () {
	//	console.log(process.argv);
		console.log(connectedComps(data));
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



var graph = [ [2,4],
	      [3],
	      [0,4],
	      [1],
	      [0,2,6,8],
	      [7,9], 
	      [4,8],
	      [5,9],
	      [6,4],
	      [5,7]
	    ];




function connectedComps(g) {

	function isGraphInvalid (g) {
		if (!Array.isArray(g) || !g.length) {
			return "Invalid input. Graph must be a non-empty array.";
		}
		return false;
	}	
	
	var invalidGraph = isGraphInvalid(g);
	if (invalidGraph) {return invalidGraph};
	
	function initAsUnexplored(g) {
		return g.map(function (vertex) {
			var adjacents = vertex;
			vertex = {};
			vertex.explored = false;
			vertex.adjacents = adjacents;
			return vertex;
		});
	}	

	g  = initAsUnexplored(g);
	
	var connComps = [];
	var i = 0;
	for (; i < g.length; i++) {
		if (g[i].explored === true) {continue;}
		var component = bfs(i);
		if (component.length) connComps.push(component);	
	}
	
	function bfs (i) {
		var queue = [];
		var explored = [];
		queue.push(i);			
		
		while (queue.length) {
			var v = queue.shift();
	
			if (g[v].explored) {
				continue;
			}
	
			queue = queue.concat(g[v].adjacents);
			g[v].explored = true;
			explored.push(v);
		}
	return explored;
	}
	return connComps;

}


		
	
	


