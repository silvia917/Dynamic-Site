//create a web server
var http = require('http');
var router = require("./router.js");

http.createServer(function (request, response) {
	router.home(request, response);
	router.user(request, response);
}).listen(3000);