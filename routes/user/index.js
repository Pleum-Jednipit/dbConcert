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
   var getConcertInfo = "SELECT *  FROM concert c, concert_showtime cs,venue v WHERE cs.Concert_ID = c.Concert_ID AND CURDATE() < cs.Concert_ShowDate  GROUP BY c.Concert_ID , cs.Concert_ShowTime_ID ORDER BY cs.Concert_ShowDate LIMIT 6;";
   connection.query(getConcertInfo, function (err, concertInfo) {
      if (err) {
         throw err;
      }
      console.log(concertInfo);
      var now = new Date();
      concertInfo.forEach(function (item, index) {
         item.Concert_ShowDate = dateFormat(item.Concert_ShowDate, "mediumDate");
      });
      res.render("./user/index", {
         concert: concertInfo,
         now: now
      });
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


router.get("/login", function (req, res) {
   res.render("./user/login");
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

            if(req.session.currentPage){
               res.redirect(req.session.currentPage);
            }
            else{
               res.redirect('/index');
            }
         } else {

            req.flash("error", "Invalid Username and Password");
            res.redirect('/login');
         }
         res.end();
      });
   } else {
      req.flash("error", "Invalid Username and Password");
      res.redirect('/login');
   }
});


//logout routes
router.get("/logout", function (req, res) {
   console.log("Logout");
   req.session.destroy();
   res.redirect("/index");
});


module.exports = router;