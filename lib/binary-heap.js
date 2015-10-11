var _ = require('lodash');

function BinaryHeap (array, key) {
	this.key = key;
	this.heap = this.makeHeap(array);
	this.lastHeapIdUsed = this.heap.length;
}

BinaryHeap.prototype.makeHeap = function (graph) {
	graph.forEach(function(node, i) {
		node.heapId = i;
	});

	this.heap = _.cloneDeep(graph);
	this.heap.unshift(null);

	var i = this.heap.length - 1;
	while (i > 0) {
		this.sink(this.heap[i], i);
		i--;
	}
	return this.heap;
};

BinaryHeap.prototype.sink = function (element, startingPos) {
	var ind = this.minChild(startingPos);
	while (ind !== 0 && this.heap[ind][this.key] < element[this.key]) {
		this.heap[startingPos] = this.heap[ind];
		startingPos = ind;
		ind = this.minChild(startingPos);
	}
	this.heap[startingPos] = element;
};

BinaryHeap.prototype.minChild = function (i) {

	if ((2 * i) > this.heap.length - 1) return 0;

	if (!this.heap[2 * i + 1]) {
		return 2 * i;
	}

	return this.heap[2 * i][this.key] < this.heap[2 * i + 1 ][this.key] ?  2 * i : 2 * i + 1;

};

BinaryHeap.prototype.swim = function (element, i) {
	var p = Math.floor(i / 2);
	while (i !== 1 && (this.heap[p][this.key] > element[this.key])) {
		this.heap[i] = this.heap[p];
		i = p;
		p = Math.floor(i / 2);
	}
	this.heap[i] = element;
};

BinaryHeap.prototype.insert = function (element) {
	element.heapId = ++this.lastHeapIdUsed;
	this.swim(element, this.heap.length);
};

BinaryHeap.prototype.delMin = function () {
	if (this.heap.length < 2) return null;
	var element = this.heap.splice(1,1);
	this.sink(this.heap[1], 1);
	return element;
};

BinaryHeap.prototype.decreaseKey = function (element) {
	var elementInHeap = _.find(this.heap, 'heapId', element.heapId);
	elementInHeap = element;
	var indexOfElement = _.findIndex(this.heap, 'heapId', element.heapId);
	this.swim(element, indexOfElement);
};




/*var heap = new BinaryHeap([{key: 18},{key: 8}, {key: 9},{key: 7}, {key: 3}, {key: 2}, {key: 21}]);
heap.insert({key: 5});
console.log(heap.heap);
heap.decreaseKey({key:4, heapId: 0});
*/

module.exports = BinaryHeap;
