module.exports = parseLineIntoVertex;

function parseLineIntoVertex (line) {
	var regex = /\d+/g;
	var arr = [];
	var numbers = line.match(regex);	
	if (numbers) {
		numbers.forEach(function (num) {
			arr.push(parseInt(num));
		});
		
	data.push(arr);
	}
}