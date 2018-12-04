var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var urlService = require('../services/urlService');

var statsService = require('../services/statsService');

router.post("/urls",jsonParser, function(req,res){
    var longUrl = req.body.longUrl;
    //var shortUrl = urlService.getShortUrl(longUrl);
    urlService.getShortUrl(longUrl,function(url){//callback function here, async
        res.json(url);
    });

});// handle long urls post request


router.get("/urls/:shortUrl", function(req,res){//callback function
    var shortUrl = req.params.shortUrl;
    urlService.getLongUrl(shortUrl,function(url){
        res.json(url);
    });

});//handle short urls get request

router.get("/urls/:shortUrl/:info", function (req,res){
    statsService.getUrlInfo(req.params.shortUrl, req.params.info, function(data){
        res.json(data);
    });
});
module.exports = router;//return the built router