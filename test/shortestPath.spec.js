var shortestPath = require('./../graphs/shortestPath').shortestPath;
var expect = require('chai').expect

var graph = [ [1,2],
	      [0,3],
	      [0,4],
	      [1, 4, 5],
	      [2,3,5],
	      [3,4]
	    ];

var graph2 = [ [2,4],
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

describe('Shortest Path:UT', function(){
  describe('invalid graph', function(){
    it('should return an error message', function(){
    	expect(shortestPath([], '2', '3')).to.equal("graph can't be empty");
    });
  });

  describe('invalid vertices', function(){
    it('should return an error message when the vertex is too large.', function(){
    	expect(shortestPath(graph, '8', '2')).to.equal("invalid vertex");
    });

    it('should return an error message when the vertex is less than 0.', function(){
    	expect(shortestPath(graph, '2', '-1')).to.equal("invalid vertex");
    });

    it('should return an error message when vertex has non-numerical characters.', function(){
    	expect(shortestPath(graph, '2', '1.5')).to.equal("invalid vertex");
		expect(shortestPath(graph, '2', 'a345')).to.equal("invalid vertex");
		expect(shortestPath(graph, '2  4', '2')).to.equal("invalid vertex");
    });
  	
    it('should return an error message when vertex is empty.', function(){
    	expect(shortestPath(graph, '2', '')).to.equal("invalid vertex");
    });
  

  });

  describe('correct distances', function(){
    it('should return the correct distances.', function(){
    	expect(shortestPath(graph, '1', '4')).to.equal(2);
    	expect(shortestPath(graph, '5', '0')).to.equal(3);
		expect(shortestPath(graph, '5', '5')).to.equal(0);
		expect(shortestPath(graph2, '2', '3')).to.equal("There's no path from 2 to 3.");  	
    });
  });



});
