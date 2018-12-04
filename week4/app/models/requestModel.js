    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;// implicit schema in noSQL

    var RequestSchema = new Schema({
        shortUrl:String,
        referer: String,
        platform: String,
        browser: String,
        country: String,
        timestamp: Date


    });//define a table


    module.exports = mongoose.model("RequestModel", RequestSchema);  ; //output
