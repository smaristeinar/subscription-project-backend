var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    console.log(req.body.name);
    console.log(req.body.status);
    req.app.locals.db.collection("smari")
    .updateOne({userName:req.body.name}, {$set:{subscribed:check(req.body.status)}})
});
function check(subscription) {
    if (subscription == "true") {
        return "false"
    }
    else{return "true"}
}
module.exports = router;
