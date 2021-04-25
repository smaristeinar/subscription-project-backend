var express = require('express');
var router = express.Router();


/* GET home page. */

router.get('/', function(req, res, next) {
    auth(res,req)
      res.send(`
      <a href="/admin/allusers"> All users</a>
      <a href="/admin/subedusers"> subscribed users</a>
      `);
     
});
router.get("/allusers",function(req,res){
    let string=`<a href="/admin"> back</a>`
    auth(res,req)
    req.app.locals.db.collection("smari").find().toArray()
    .then(resaults => {
        for (let i = 0; i < resaults.length; i++) {
           string += `<div>
            <h2>Name:${resaults[i].userName}</h2>
            <p>subscribed:${resaults[i].subscribed}</p>
            </div>`
            
        }
        console.log(string);
        res.send(string);
    }) 
    
})
router.get("/subedusers",function(req,res){
    let string=`<a href="/admin"> back</a>`
    auth(res,req)
    req.app.locals.db.collection("smari").find().toArray()
    .then(resaults => {
        for (let i = 0; i < resaults.length; i++) {
           if (resaults[i].subscribed == "true") {
            string += `<div>
            <h2>Name:${resaults[i].userName}</h2>
            </div>`
            
           }
        }
        console.log(string);
        res.send(string);
    }) 
    
})


module.exports = router;


function auth(res, req){
    const reject = () => {
        res.setHeader("www-authenticate", "Basic");
        res.sendStatus(401);
      };
    
      const authorization = req.headers.authorization;
    
      if (!authorization) {
        return reject();
      }
    
      const [username, password] = Buffer.from(
        authorization.replace("Basic ", ""),
        "base64"
      )
        .toString()
        .split(":");
    
      if (!(password == "admin" && username == "admin")) {
        return reject();
      }
}