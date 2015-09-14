var fs = require('fs');

//Function that handles the reading of files and merge in value
	//read from file and get a string
		//merge values into string
function mergeValues(values, content) {
	for (var key in values) {
		content = content.replace("{{" + key + "}}", values[key]);
	}
	return content;
}

function view(templateName, values, response) {
	//read from the template file
	var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf-8"});
	//insert values into the content
	fileContents = mergeValues(values, fileContents);
	//write out the contents to the response
		response.write(fileContents);
	
}

module.exports.view = view;