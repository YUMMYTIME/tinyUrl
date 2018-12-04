var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var urlService = require('../services/urlService');

router.post("/urls",jsonParser, function(req,res){
    var longUrl = req.body.longUrl;
    //var shortUrl = urlService.getShortUrl(longUrl);
    urlService.getShortUrl(longUrl,function(url){//callback function here, async
        res.json(url);
    });

});// handle long urls post request


router.get("/urls/:shortUrl", function(req,res){//callback function
    var shortUrl = req.params.shortUrl;
    var longUrl = urlService.getLongUrl(shortUrl,function(url){
        res.json(url);
    });

});//handle short urls get request

module.exports = router;//return the built router