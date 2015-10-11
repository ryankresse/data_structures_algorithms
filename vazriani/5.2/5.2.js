var makeGraph = require('../../lib/graphs/helpers/make-weighted-graph');
var prim = require('../../lib/graphs/prim');

makeGraph('5.2.txt').then(function(g){
  console.log(prim(g));
}).fail(function(reason){
  console.error(reason.stack);
});
