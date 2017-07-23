var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

app.set('port', (process.env.PORT || 5000));

router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
});

router.get("/",function(req,res){
    res.sendFile(path + "index.html");
});

router.get("/awards",function(req,res){
    res.sendFile(path + "awards.html");
});

router.get("/beneficiaries",function(req,res){
    res.sendFile(path + "beneficiaries.html");
});

router.get("/contact",function(req,res){
    res.sendFile(path + "contact.html");
});

router.get("/fundraising",function(req,res){
    res.sendFile(path + "fundraising.html");
});

router.get("/signedup",function(req,res){
    res.sendFile(path + "signedup.html");
});

router.get("/sponsor",function(req,res){
    res.sendFile(path + "sponsor.html");
});

router.get("/volunteer",function(req,res){
    res.sendFile(path + "volunteer.html");
});

app.use("/",router);

app.use(express.static(__dirname + '/public'));

app.use("*",function(req,res){
    res.sendFile(path + "404.html");
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
