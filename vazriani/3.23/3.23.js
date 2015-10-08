/*
  counts paths between two vertices in a directed, acylic graph
*/

var makeGraph = require('../../lib/graphs/helpers/makeGraph');
var initAsUnexplored = require('../../lib/graphs/helpers/initVerticesAsUnexplored');
var _ = require('lodash');
var count = 0;


makeGraph('3.23.txt').then(function(graph){
	graph = initAsUnexplored(graph);
  countPathsBetween(_.cloneDeep(graph), graph[0], 'H');
  console.log(count);
}).fail(function(reason){
  console.error(reason.stack)
});

function countPathsBetween(g, v1, v2)  {
  console.log(v1.id);
  if (v1.id === v2) {
    count++;
    return;
  }

  if (v1.explored === false) {
    v1.explored = true;
    v1.a.forEach(function (adjacent){
      var graphIndexOfAdjacent = _.findIndex(g, function (vertexValue) {
        return vertexValue.id === adjacent;
      });
        countPathsBetween(_.cloneDeep(g), g[graphIndexOfAdjacent], v2);
    });
  }
}
