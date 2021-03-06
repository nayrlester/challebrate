// This file handles the configuration of the app.
// It is required by app.js

var express = require('express');
var bodyParser=require("body-parser");

module.exports = function(app, io){

	// Set .html as the default template extension
	app.set('view engine', 'html');

	// Initialize the ejs template engine
	app.engine('html', require('ejs').renderFile);

	// Tell express where it can find the templates
	app.set('views', __dirname + '/views');

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	// Make the files in the public folder available to the world
	app.use(express.static(__dirname + '/public'));

};
