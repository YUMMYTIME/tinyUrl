var express = require('express');
var router = express.Router();
var urlService = require('../services/urlService');
var path = require('path');//path is a variable offered by node.js

router.get("*", function(req,res){
        var shortUrl = req.originalUrl.slice(1);//meaning/0 : get ride of the /,remain 0

        var longUrl = urlService.getLongUrl(shortUrl,function(url){
            if(url){
                res.redirect(url.longUrl);
            }else{//avoid too many redirect
                res.sendFile("404.html", { root: path.join(__dirname,'../public/views/')});
            }
        });

});



module.exports = router;//return the built router