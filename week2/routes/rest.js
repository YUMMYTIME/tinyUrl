var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var urlService = require('../services/urlService');

router.post("/urls",jsonParser, function(req,res){
    var longUrl = req.body.longUrl;
    var shortUrl = urlService.getShortUrl(longUrl);
    res.json({
        shortUrl: shortUrl,
        longUrl: longUrl
    });
});// handle long urls post request


router.get("/urls/:shortUrl", function(req,res){
    var shortUrl = req.params.shortUrl;
    var longUrl =
.getLongUrl(shortUrl);
    res.json({
        shortUrl: shortUrl,
        longUrl: longUrl
    });
});//handle short urls get request

module.exports = router;//return the built router