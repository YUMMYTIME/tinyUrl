var UrlModel = require("../models/urlModel");
var redis = require("redis");

var port = process.env.REDIS_PORT_6379_TCP_PORT;
var host = process.env.REDIS_PORT_6379_TCP_ADDR;//two environment variables
var redisClient = redis.createClient(port, host);

var encode = [];

var genCharArray = function(charA,charZ){
        var arr = [];
        var i = charA.charCodeAt(0);//eg:31
        var j = charZ.charCodeAt(0);
        for(; i <= j; i++) {
            arr.push(String.fromCharCode(i));//eg:i=6
        }
        return arr;
};
encode = encode.concat(genCharArray('a','z'));//begin from a == former 0
encode = encode.concat(genCharArray('A','Z'));
encode = encode.concat(genCharArray('0','9'));

var getShortUrl = function (longUrl, callback) {
    if (longUrl.indexOf('http') === -1) {
        longUrl = "http://" + longUrl;
    }

    redisClient.get(longUrl, function(err, shortUrl){
        if(shortUrl){
            console.log("redis cache works on get longUrl!");
            callback({
                shortUrl: shortUrl,
                longUrl: longUrl
            });
        }else{
            UrlModel.findOne({longUrl: longUrl}, function (err, data) {//callback function, use it when longUrl is returned, and the default order is error and data
                if (data) {
                    callback(data);//shortUrl has already exists in DB
                    redisClient.set(data.shortUrl, data.longUrl);
                    redisClient.set(data.longUrl, data.shortUrl);

                } else {//undefined, shortUrl does not exist in DB
                    generateShortUrl(function (shortUrl) { //return shortUrl
                        var url = new UrlModel({
                            shortUrl: shortUrl,
                            longUrl: longUrl//see urlModel define
                        });
                        url.save();// save the url to table
                        callback(url);//return url
                        redisClient.set(shortUrl, longUrl);
                        redisClient.set(longUrl, shortUrl);
                    });
                }
            });
        };

    })
    };

var generateShortUrl = function(callback){
    UrlModel.count({},function(err, num){ //you count, I do other things ,when you count all, tell me
        callback(convertTo62(num));
    });
    //return Object.keys(longToShortHash).length;
    // return convertTo62(Object.keys(longToShortHash).length);
};

var convertTo62 = function (num) {
    var result = "";
    do{
        result =  encode[num % 62] + result;
        num = Math.floor(num / 62);
    }while(num);
    return result;
};

var getLongUrl = function(shortUrl, callback){
    redisClient.get(shortUrl, function(err, longUrl){
     if(longUrl){
         console.log("Redis cache works on finding longUrl!");
         callback({
             shortUrl: shortUrl,
             longUrl: longUrl
         });
     } else {
         UrlModel.findOne({shortUrl:shortUrl},function (err, data){
             callback(data);
             redisClient.set(shortUrl, longUrl);
             redisClient.set(longUrl, shortUrl);
         });
     }
    });
};

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};//return, why use this is great? choose what to return to the outside