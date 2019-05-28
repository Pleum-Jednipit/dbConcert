var express = require("express");
var router = express.Router();
const connection = require("../../connection");
var middleware = require("../../middleware");
var dateFormat = require('dateformat');

//root route landing 
router.get("/", function (req, res) {
   res.render("./user/landing");
});

// Index
router.get("/index", function (req, res) {
   var getAllConcert = "SELECT * FROM concert c, concert_showtime cs WHERE c.Concert_ID = cs.Concert_ID AND CURDATE() < cs.Concert_ShowDate ";
    connection.query(getAllConcert, function (err, concert) {
       if (err) {
          throw err;
       }
   console.log(concert[0].Concert_Sales_Date);
   res.render("./user/index");
      });
});

// show register form
router.get("/register", function (req, res) {
   var getUserName = "SELECT Member_Username FROM member";
   connection.query(getUserName, function (err, allUserName) {
      if (err) {
         throw err;
      }
      allUserName.forEach(function (userName) {
         console.log(userName.Member_Username);
      });
      res.render("./user/register");
   });

});

// Add member data into db
router.post("/register", function (req, res) {
   var sql = "INSERT INTO member ( Member_Username, Member_Password, Member_Name, Member_DOB, Member_Gender, Member_EmailAddress , Member_Address , Member_PhoneNumber,MemberType_ID) " +
      "VALUES (?,?,?,?,?,?,?,?,?)";
   var userName = req.body.username;
   var password = req.body.password;
   var name = req.body.name;
   var dob = req.body.date;
   var gender = req.body.gender;
   var email = req.body.email;
   var address = req.body.address;
   var phoneNumber = req.body.phone;
   var dateOfBirth = dateFormat(dob,"isoDate");
   connection.query(sql, [userName, password, name, dateOfBirth, gender, email, address, phoneNumber, 1], function (err, result) {
      if (err) {
         throw err;
      }
      console.log("1 Member Record inserted");
      res.redirect("/index");
   });
});


//handling user sign in
router.post("/login", function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   console.log("User: " + username);
   console.log("Pass: " +password);
   if (username && password) {
      var sql = 'SELECT * FROM member WHERE Member_USername = ? AND Member_Password = ?';
      connection.query(sql, [username, password], function (error, results, fields) {
         console.log(results);
         if (results.length > 0) {
            req.session.isLogin = true;
            req.session.username = username;
            console.log("HEere");
            console.log("Login:" + req.session.isLogin);
            console.log("Username: " + req.session.username);

            req.flash("success", "Welcome to Concert " + req.session.username);

            res.redirect('/index');
         } else {

            req.flash("error", "Invalid Username and Password");
            res.redirect('/index');
         }
         res.end();
      });
   } else {
      res.send('Please enter Username and Password!');
      res.end();
   }
});


//logout routes
router.get("/logout", function (req, res) {
   console.log("Logout");
   req.session.destroy();
   res.redirect("/index");
});


module.exports = router;