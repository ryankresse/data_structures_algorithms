var _ = require('lodash');
var makeGraph = require('./helpers/make-weighted-graph');

function BellmanFord(g, o) {
	this.g = _.cloneDeep(g);
	this.init(this.g, o);
	_.times(this.g.length - 1, this.outerLoop, this);
	console.log(this.g);
}

BellmanFord.prototype.init = function (g,o) {
	g.forEach(function(v){
		v.dist = Number.MAX_VALUE;
		v.prev = null;
	});
	this.o = _.find(this.g, 'id', o);
	this.o.dist = 0;
};

BellmanFord.prototype.outerLoop = function () {
	var self = this;
	this.g.forEach(function(v) {
		if (v.a) {
			self.update(v);
		}
	});
};

BellmanFord.prototype.update = function (v) {
	var self = this;
	v.a.forEach(function(a) {
		var aVertex = _.find(self.g, 'id', a.v);
		if (aVertex.dist > (v.dist + a.w)) {
			aVertex.dist = v.dist + a.w;
			aVertex.prev = v.id;
		}
	});
};


makeGraph('weight-text.txt').then(function(data) {
	var bell = new BellmanFord(data,'s');

})
.fail(function(error){
	console.error(error.stack);
});