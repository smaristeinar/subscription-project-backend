var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
  req.app.locals.db.collection("smari").find().toArray()
  .then(resaults => {
    res.send(resaults);
    return
  }) 
  
});

module.exports = router;
