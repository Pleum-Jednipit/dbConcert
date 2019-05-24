var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mysql = require("mysql");
const connection       = require("./connection")
var indexRoutes      = require("./routes/index"),
    adminRoutes      = require("./routes/admin"),
    concertRoutes    = require("./routes/admin/concert");

connection.connect(function(err){
   if(err){
      console.log("Fail to connect to database");
      throw err;
   }else{
      console.log("Successfully connect to database")
   }
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

app.use(methodOverride('_method'));
app.use("/", indexRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/concert-index",concertRoutes);


app.listen(3000, function(){
   console.log("The Concert Server Has Started!!!"); 
});