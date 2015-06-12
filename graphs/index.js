var graph = [
				{ vertex: 1,
				  adjacents: [2, 4]
				},
				{ vertex: 2,
				  adjacents: [1, 3]
				},
				{ vertex: 3,
				  adjacents: [4, 2]
				},
				{ vertex: 4,
				  adjacents: [1, 3]
				}
			];

function randomContraction(graph) {
	
	function getRandomIndexFromArray(array) {
		return Math.floor(Math.random() * ((array.length) - 0));
	}

	function deleteAdjacent (adjacencyArray, adjacentToDelete) {
		for (var i = adjacencyArray.length - 1; i >= 0; i--) {
			if (adjacencyArray[i] === adjacentToDelete) {
				adjacencyArray.splice(i, 1);
			}
		}
	}

	function deleteSuperVertexFromVertexToBeContractedAdjList () {
		for (var j = 0; j < graph.length; j++) {
			if (graph[j]['vertex'] === vertexToBeContracted) {
				deleteAdjacent(graph[j]['adjacents'], superVertex['vertex']);
				break;
			}
		}
	}

	function addContractedVertexAdjListToSuperVertexAdjList (indexOfSuperVertex, indexOfVertexToContract) {
		graph[indexOfSuperVertex]['adjacents'] = graph[indexOfSuperVertex]['adjacents'].concat(graph[indexOfVertexToContract]['adjacents']);
	}

	function changeContractedVertexToSuperVertexInAdjLists (vertexToDelete, supVertex) {
		for (var k = 0; k < graph.length; k++) {
			if (graph[k]['vertex'] !== vertexToDelete && graph[k]['vertex'] !== supVertex) {
				graph[k]['adjacents'].forEach(function (adjacent, i) {
					if (adjacent === vertexToDelete) {
						graph[k]['adjacents'][i] = supVertex;
					}
				});
			}
		}
	}

	function findVertexIndex(vertex) {
		for (var m = 0; m < graph.length; m++) {
			if (graph[m]['vertex'] === vertex) {
				return m;
			}
		}
	}
	
	function deleteVertexFromGraph (vertexIndex) {
		graph.splice(vertexIndex, 1);
	}

	var superVertexIndex = 0; //getRandomIndexFromArray(graph);
	var superVertex = graph[superVertexIndex];
	var vertexToBeContractedIndex = 0; // getRandomIndexFromArray(superVertex['adjacents']);
	var vertexToBeContracted = superVertex['adjacents'][vertexToBeContractedIndex];
	var vertexToBeContractedIndexInGraphArray = findVertexIndex(vertexToBeContracted);
	
	deleteAdjacent(superVertex['adjacents'], vertexToBeContracted);
	deleteSuperVertexFromVertexToBeContractedAdjList();
	addContractedVertexAdjListToSuperVertexAdjList(superVertexIndex, vertexToBeContractedIndexInGraphArray);
	changeContractedVertexToSuperVertexInAdjLists(vertexToBeContracted, superVertex['vertex']);
	deleteVertexFromGraph(vertexToBeContractedIndexInGraphArray);

	return graph;
}


randomContraction(graph);

