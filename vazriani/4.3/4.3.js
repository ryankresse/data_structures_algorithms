/*
	finds cycles that resemble squares (4 vertices, no diagonals) in an undirected graph
*/

'use strict';
var makeGraph = require('../../lib/graphs/helpers/makeGraph');
var _ = require('lodash');

function Squares(g) {
	this.graph = g;
	this.squares = [];
	var self = this;
	this.graph.forEach(function(v){
		self.findSquares(v, v, 0, []);
	})

	this.squares = this.removeDuplicates(this.squares);
	this.squares = this.removeSquaresWithDiagonals(this.squares);
	console.log(this.squares);
}

Squares.prototype.findSquares = function(o, v, i, path) {
	var vert = _.cloneDeep(v);
	var self = this;	
	if (i === 4) {
		if (vert.id === o.id) {
			this.squares.push(path);
		}
		return;
	}

	path.push(vert.id);

	vert.a.forEach(function(a){
		var aInGraph = _.cloneDeep(_.find(self.graph, 'id', a));
		var recursion = true;
	
		if ((aInGraph.id === path[path.length - 2])) {
			recursion = false;
		}

		if (i < 3 &&  aInGraph.id === o.id) {
			recursion = false;
		}

		if (recursion) {
			self.findSquares(o, aInGraph, i + 1, _.cloneDeep(path));
		}
		
	});
};

Squares.prototype.removeDuplicates = function(arr) {
	arr = arr.map(function(sq) {
		sq = sq.sort(function(v1, v2){
			if ( v1 > v2) {
				return -1;
			}
			if ( v1 < v2) {
				return 1;
			}
			return 0;
		});
		return sq.join(':)');		
	});
	arr = _.uniq(arr);	
	arr = arr.map(function(sq) {
		return sq.split(':)');
	});
	return arr;
};

Squares.prototype.removeSquaresWithDiagonals = function(arr) {
	var self = this;
	 arr = arr.filter(function(sq){
		var noDiag = true;
		sq.forEach(function(v) {
			var vAdj = _.find(self.graph, 'id', v).a;
			var sqWithoutV = _.filter(sq, function(vert) {
				return vert !== v;
			});

			var matches = 0;
			
			vAdj.forEach(function(a){
				if (_.includes(sqWithoutV,a)) {
					matches++;
				}
			}); 
			if (matches === 3) {
				noDiag = false;
			} 
		});
		return noDiag;
	});
	 return arr;
};

makeGraph('4.3.txt').then(function(g) {
	var squares = new Squares(g);
})
.fail(function(reason){
	console.log(reason);
});