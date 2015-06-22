
var fileReader = require('./../helpers/fileReader');
var initAsUnexplored = require('./helpers/initVerticesAsUnexplored');
//var parseLineIntoVertex = require('./helpers/parseLineIntoVertex');
var file = process.argv[0];
var data = [];
exports.connectedComps = connectedComps;

if (process.env.NODE_ENV !== "test") {
	fileReader(process.argv[2], parseLineIntoVertex)
		.then(function () {
			console.log(connectedComps(data));
		}); 	
}

function parseLineIntoVertex (line) {
	var regex = /\d+/g;
	var arr = [];
	var numbers = line.match(regex);	
	if (numbers) {
		numbers.forEach(function (num) {
			arr.push(parseInt(num));
		});
		//console.log(arr);
		data.push(arr);
		//console.log(data);
	}
	
}

function connectedComps(g) {

	function isGraphInvalid (g) {
		if (!Array.isArray(g) || !g.length) {
			return "Invalid input. Graph must be a non-empty array.";
		}
		return false;
	}	
	
	var invalidGraph = isGraphInvalid(g);
	if (invalidGraph) {return invalidGraph};
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



