var express = require('express');
var rand = require("random-key");
var router = express.Router();
/* GET home page. */
router.post('/', function(req, res, next) {
    req.app.locals.db.collection("smari").find({userName:req.body.userName}).toArray()
    .then(function(count) {
        if(count.length == 0){
            req.body.randomKey = rand.generate(7); 
            req.app.locals.db.collection("smari").insertOne(req.body).then(console.log("added"));
            res.send({message:"succsess you have created an account",color:"#2ecc71"});            
       }
       else{
           res.send({message:"User allready exists pleas pick another name", color:"#db3434"});
       }
    }).catch((err) => res.send({message:err,status:"error"}));

});

module.exports = router;


