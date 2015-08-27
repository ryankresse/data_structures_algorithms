var _ = require('lodash');

function WaterPouring () {
	this.graph = [];
	this.successfulSequences = [];


	var sequence = [];
	var four = {
		capacity: 4,
		filled: 4,
		left: function () {
			return this.capacity - this.filled;
		}
	};
	
	var seven = {
		capacity: 7,
		filled: 7,
		left: function () {
			return this.capacity - this.filled;
		}
	};
	
	var ten = {
		capacity: 10,
		filled: 0,
		left: function () {
			return this.capacity - this.filled;
		}
	};
	this.pour(_.clone(seven), _.clone(ten), _.clone(four), _.clone(sequence));
	this.pour(_.clone(ten), _.clone(seven), _.clone(four), _.clone(sequence));
	this.pour(_.clone(four),_.clone(ten), _.clone(seven), _.clone(sequence));
	this.pour(_.clone(ten),_.clone(four), _.clone(seven), _.clone(sequence));
	this.pour(_.clone(four), _.clone(seven), _.clone(ten), _.clone(sequence));
	this.pour(_.clone(seven), _.clone(four), _.clone(ten), _.clone(sequence));
}


WaterPouring.prototype.pour = function (pourer, pouree, other, sequence) {
	if (pourer.filled === 0 || (pouree.filled === pouree.capacity))	{
			return;	
	}
	var seven,
		four,
		ten,
		pourerPhrasePart,
		poureePhrasePart;
	
	if (pourer.capacity === 10) {
		ten = pourer;
		pourerPhrasePart = "Ten";
	} 
	else if (pourer.capacity === 7) {
		seven = pourer;
		pourerPhrasePart = "Seven";
	} 
	else {
		four = pourer;
		pourerPhrasePart = "Four";
	}

	if (pouree.capacity === 10) {
		ten = pouree;
	 	poureePhrasePart = "Ten";
	} 
	else if (pouree.capacity === 7) {
		seven = pouree;
	 	poureePhrasePart = "Seven";	
	} 
	else {
		four = pouree;
	 	poureePhrasePart = "Four";
	}

	var pourPhrase = pourerPhrasePart + " into " + poureePhrasePart;

	if (seven !== pouree & seven !== pourer){
		seven = other;
	}
	if (ten !== pouree & ten !== pourer){
		ten = other;
	}
	if (four !== pouree & four !== pourer){
		four = other;
	}
	

	poureeLeft = pouree.left();
	pourerFilled = pourer.filled;
	if (pourer.filled > poureeLeft) {
		pouree.filled = pouree.capacity;
		pourer.filled = pourer.filled - poureeLeft;
	} 
	else if (pourer.filled < poureeLeft) {
		pourer.filled = 0;
		pouree.filled = pouree.filled + pourerFilled;
	} 
	else {
		pourer.filled = 0;
		pouree.filled = pouree.capacity;
	}

	var duplicateState = this.findDuplicateState(this.graph, seven, ten, four);
	
	if (duplicateState && seven.filled !== 2 && four.filled !==2 ) {
		return;		
	}
	
	sequence.push(pourPhrase);

	if (duplicateState && (seven.filled === 2 || four.filled === 2 )) {
		this.successfulSequences.push(sequence);
		return;
	}

	if (!duplicateState && (seven.filled === 2 || four.filled === 2 )) {
		this.graph.push({
			seven: seven.filled,
			four: four.filled,
			ten: ten.filled
			}
		);
		this.successfulSequences.push(sequence);
		return;
	}
	
	if (!duplicateState && seven.filled !== 2 && four.filled !== 2 ) {
		this.callAllPourPossibilities(this.graph, seven, ten, four, sequence);
	}
};

WaterPouring.prototype.findDuplicateState = function (graph, seven, ten, four) {
	return _.find(graph, function(node) {
		return node.seven === seven.filled &&
				node.ten === ten.filled &&
				node.four === four.filled 	
	});
};

WaterPouring.prototype.callAllPourPossibilities = function (graph, seven, ten, four, sequence) {
		graph.push({seven: seven.filled, four: four.filled, ten:ten.filled, sequence: sequence});
		this.pour(_.clone(seven), _.clone(ten), _.clone(four), _.clone(sequence));
		this.pour(_.clone(ten), _.clone(seven), _.clone(four), _.clone(sequence));
		this.pour(_.clone(four),_.clone(ten), _.clone(seven), _.clone(sequence));
		this.pour(_.clone(ten),_.clone(four), _.clone(seven), _.clone(sequence));
		this.pour(_.clone(four), _.clone(seven), _.clone(ten), _.clone(sequence));
		this.pour(_.clone(seven), _.clone(four), _.clone(ten), _.clone(sequence));
};

var pouring = new WaterPouring();
console.log(pouring.successfulSequences);
