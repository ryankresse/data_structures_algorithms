module.exports = initAsUnexplored;

function initAsUnexplored(g) {
		return g.map(function (vertex) {
			var adjacents = vertex;
			vertex = {};
			vertex.explored = false;
			vertex.adjacents = adjacents;
			return vertex;
		});
}	