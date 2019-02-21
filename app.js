var express = require('express'),
	app = express()
 	,bodyParser=require("body-parser")
 	,express = require('express')
  	,http = require('http')
  	,path = require('path')
  	,dateFormat = require('dateformat')
  	,promise = require('bluebird')
 	,session = require('express-session')
 	,app = express()
 	,bodyParser=require("body-parser");
app.use(express.urlencoded({ extended: false }));
app.use(session({
              secret: 'xxxaXXXXbyyycYYYdzzzZZZ',
              resave: false,
              saveUninitialized: true,
              cookie: { 
                        /*maxAge: 60000 */  
                      }
            }))

app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  res.locals.role = req.session.role;
  global.userId = req.session.userId;
  next();
});

var mysql      = require('mysql');
var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : 'alexachloe_2903',
              database : 'challebrate'
            });

module.exports = connection;

connection.connect();
global.db = connection;
global.mysql = promise.promisifyAll(connection)
global.dateFormat = dateFormat;

var port = process.env.PORT || 8080;
var io = require('socket.io').listen(app.listen(port));
require('./config')(app, io);
require('./routes')(app, io);

console.log('Your application is running on http://localhost:' + port);