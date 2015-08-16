var graph = [ [1,2],
	      [0,3],
	      [0,4],
	      [1, 4, 5],
	      [2,3,5],
	      [3,4]
	    ];




function bfs(g, v) {

	function areInputsinvalid (g,v) {
		if (v > g.length - 1 || v < 0) {
			return "invalid vertex";
		}
		if (!g.length) {
			return "graph can't be empty";
		}
		return false;
	}	
	
	var invalidInput = areInputsinvalid(g,v);
	if (invalidInput) {return invalidInput};
	
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

	g  = initAsUnexplored(g);
	var queue = [];
	queue.push(v);
	g[v].dist = 0;
	while (queue.length) {
		console.log(queue);
		var v = queue.shift();

		if (g[v].explored) {
			continue;
		}
			g[v].adjacents.forEach(function(adj) {
			if (g[adj].dist == undefined) {
				g[adj].dist = g[v].dist + 1;		
			}
		});
			
		queue = queue.concat(g[v].adjacents);
			
		g[v].explored = true;
	}						
		
	console.log(g);


}
bfs(graph, 3);


		
	
	


