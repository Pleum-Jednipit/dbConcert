var express = require("express");
var router  = express.Router();
var passport = require("passport");
const connection = require("../connection")

//root route landing 
router.get("/", function(req, res){
    res.render("landing");
});

// Index
router.get("/concert", function(req, res){
    res.render("index");
});

// show register form
router.get("/register", function(req, res){
   var getUserName = "SELECT Member_Username FROM member";
   connection.query(getUserName,function (err, allUserName) {
      if (err) {
         throw err;
      }
      allUserName.forEach(function(userName) {
         console.log(userName.Member_Username);
      });
      res.render("register",{allUserName : allUserName}); 
   });
   
});

// Add member data into db
router.post("/newregister", function(req, res){
    var sql = "INSERT INTO member ( Member_Username, Member_Password, Member_Name, Member_DOB , Member_Email_Address , Member_Address , Member_Phone_Number) " 
              + "VALUES (?,?,?,?,?,?,?)";
    var userName = req.body.userName;
    var password = req.body.password;
    var name = req.body.firstName + req.body.lastName
    var dob  = req.body.dob
    var gender = req.body.gender;
    var email = req.body.email;
    var address = req.body.address;
    var phoneNumber = req.body.phoneNumber;
    console.log(dob)
    connection.query(sql,[userName,password,name,dob,email,address,phoneNumber],function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 record inserted");
       res.redirect("/concert");
    });
 });






module.exports = router;