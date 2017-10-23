'use strict';
var express = require("express"),
	routes = require("./app/routes/index.js"),
	mongoose = require("mongoose"),
	passport = require('passport'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	favicon = require('serve-favicon');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGO_URI, { useMongoClient: true,});

app.use(bodyParser.urlencoded())
app.use(favicon(process.cwd() + '/public/img/favicon.ico'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret:'secretClementine',
	resave:false,
	saveUnintialized:true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port, function(){
	console.log("Listening on port" + port + '...');
});
