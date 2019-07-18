var db = require("./db");
var express = require("express");
//khởi tạo server
const bodyParser = require("body-parser");
var app = express();
const PORT = process.env.PORT || 5000;
var user = require("./models/user.model");
var userRouter = require("./router/use.router");

//jsonwebtoken = require("jsonwebtoken");
//app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.static(__dirname));
jsonwebtoken = require("jsonwebtoken");
var allowCrossDomain = function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}
app.use(allowCrossDomain);
app.use('/api',userRouter());
app.use('/uploads', express.static('uploads'));
app.listen(PORT, function() {
  console.log("Listening on " + PORT);
});

app.get("/", (req, res) => {
  res.send("listening on " + PORT);
});