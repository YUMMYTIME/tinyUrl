var express = require('express');
var router = express.Router();

var path = require('path');//path is a variable offered by node.js


router.get("/", function(req,res){
    res.sendFile("index.html",{ root:path.join(__dirname,"../public/views")});// find path based on current address

});

module.exports = router;//return the built router