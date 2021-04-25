var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let newuserRouter = require("./routes/newuser");
let updateSubRouter = require("./routes/updatesub");
let adminRoute = require("./routes/admin");
const uri = "mongodb+srv://admin:admin@cluster0.vedym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var app = express();



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if(err){
    console.log(err);
  }
  
  const collection = client.db("users");
  app.locals.db = collection

  
});


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/newuser',newuserRouter);
app.use("/updatesub",updateSubRouter);
app.use("/admin",adminRoute)
module.exports = app;
