var express = require('express');
var app = express();//execute express

var restRouter = require('./routes/rest');
var redirectRouter = require('./routes/redirect');
var indexRouter = require('./routes/index');

var mongoose = require('mongoose');//mongoose
mongoose.connect("mongodb://user:user123@ds151863.mlab.com:51863/tinyurl",{ useNewUrlParser: true });
//mongodb:<dbuser>:<dbpassword>@ds151863.mlab.com:51863/tinyurl

app.use("/public", express.static(__dirname + "/public"));

app.use("/api/v1", restRouter);//post--create, insert, generate short url according to long url

app.use("/", indexRouter);

app.use("/:shortUrl", redirectRouter);// get-read longUrl


app.listen(3000);
