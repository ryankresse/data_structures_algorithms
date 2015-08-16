module.exports = initAsUnexplored;

function initAsUnexplored(g) {
		return g.map(function (vertex) {
			vertex.explored = false;
			return vertex;
		});
}	