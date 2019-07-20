"use strict";

var express        = require('express');
var bodyParser     = require("body-parser");
var compression    = require("compression");

var app = express();

app.use(bodyParser.urlencoded({
    parameterLimit:500,
    limit: "10mb",
    extended: true
}));

app.use(compression());

app.use(bodyParser.json({limit: "10mb"}));

//Routes
var Scrapper = require("./routes/scrapper");

//Apis
app.use("/scrapper"  , Scrapper);

app.listen(process.env["port"] || 8080,function(){
	console.log("Server running on port 8080");
})

module.exports = app;