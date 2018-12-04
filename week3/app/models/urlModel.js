var mongoose = require("mongoose");
var Schema = mongoose.Schema;// implicit schema in noSQL

var UrlSchema = new Schema({
    shortUrl:String,
    longUrl: String
});//define a table

var urlModel = mongoose.model("UrlModel", UrlSchema);
module.exports =  urlModel; //output
