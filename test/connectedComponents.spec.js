var connectedComps = require('./../lib/graphs/connectedComponents').connectedComps;
var expect = require('chai').expect


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

describe('Connected Components:UT', function(){
  
  describe('invalid graph', function(){
    it('should return an error message', function(){
    	expect(connectedComps([])).to.equal("Invalid input. Graph must be a non-empty array.");
      expect(connectedComps("heooloolol")).to.equal("Invalid input. Graph must be a non-empty array.");
      expect(connectedComps('')).to.equal("Invalid input. Graph must be a non-empty array.");
    });

  });


  describe('return right components', function(){
    it('should return the right components', function(){
      var connComps = connectedComps(graph);
      var expected = [ [ 0, 2, 4, 6, 8 ], [ 1, 3 ], [ 5, 7, 9 ] ];

      for (var i = 0; i < connComps.length; i++) {
        for (var j = 0; j < connComps[i].length; j++) {
          expect(connComps[i][j]).to.equal(expected[i][j]);
        }
      }
    });

  });

});
