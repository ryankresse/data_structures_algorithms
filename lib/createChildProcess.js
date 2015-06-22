var fs = require('fs');
var childP = require('child_process');

module.exports = createChildProcess;



function createChildProcess (req, res, pathToNodeFile, pathToDataFile, additionalArgs) {
	var command = "node " + pathToNodeFile + " " + pathToDataFile;
	if (additionalArgs) {
		additionalArgs.forEach(function (arg) {
			command += " " + arg;
		});
	}

	childP.exec(command, function (err, stdout, stderr) {
		if (err) {
			console.log(err);	
			res.status(400).send(err) 
		
		}
		if (stderr) {
			console.log(stderr);	
			res.status(400).send(stderr) 
		} 
		if (stdout) {
			console.log(stdout);	
			res.status(200).send(stdout);
		}	
		fs.unlink(pathToDataFile, function (err){
			if (err) console.log(err);
		});

	});

}