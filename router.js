var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");

var commonHeaders = {'Content-Type': 'text/html'};

console.log('Server running at http://<workspace-url>/');

//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
	//if url == '/' && GET
		//show search
	//seems like request.url only takes into account what's after the / 
	//so if the url is only a slash, this indicates the home page
if (request.url === "/") {
	if(request.method.toLowerCase() === "get") {
  response.writeHead(200, commonHeaders);
  renderer.view("header", {}, response);
  renderer.view("search", {}, response);
  renderer.view("footer", {}, response);
  response.end();
}
	else {
		//if url == "/" && POST
		
		//get the post data from body
		request.on("data", function(postBody) {
		//extract the username
		var query = querystring.parse(postBody.toString());
			response.writeHead(303, {"Location": "/" + query.username});
			response.end();
		//redirect to /:username
		});
}
}
}

function user(request, response) {
	//if we're not going to the home page, we can find the username input by replacing
	//the slash with a blank space. if the length is still greater than 0, that means there was input
	var username = request.url.replace("/", "");
if (username.length > 0) {
  response.writeHead(200, commonHeaders);
  renderer.view("header", {}, response);
	//get JSON from treehouse
	var studentProfile = new Profile(username);
	//on "end"
	studentProfile.on("end", function(profileJSON) {
		//show profile
		//store the values which we need
		var values = {avatarUrl: profileJSON.gravatar_url, 
					  username: profileJSON.profile_name, 
					  badges: profileJSON.badges.length, 
					  javascriptPoints: profileJSON.points.JavaScript}
		//simple response
  renderer.view("profile", values, response);
  renderer.view("footer", {}, response);
  response.end();
	});
//on error
	studentProfile.on("error", function(error) {
		renderer.view("error", {errorMessage: error.message}, response);
		renderer.view("search", {}, response);
		renderer.view("footer", {}, response);
		response.end();
			//show error
	});
}
}

module.exports.home = home;
module.exports.user = user;