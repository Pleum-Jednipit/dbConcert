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
   var getConcertInfo = "SELECT *  FROM concert c, concert_showtime cs,venue v WHERE cs.Concert_ID = c.Concert_ID AND CURDATE() < cs.Concert_ShowDate AND c.Venue_ID = v.Venue_ID GROUP BY c.Concert_ID , cs.Concert_ShowTime_ID ORDER BY cs.Concert_ShowDate LIMIT 8;";
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
   var dateOfBirth = dateFormat(dob, "isoDate");
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
   console.log("Pass: " + password);
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

            req.flash("success", "Welcome to our Concert Reservation Website   " + req.session.username + "!");

            if (req.session.currentPage) {
               res.redirect(req.session.currentPage);
            } else {
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


router.get("/statistic", function (req, res) {
   var table1 = "SELECT * FROM venue ORDER BY Venue_SeatingCapacity DESC;";
   connection.query(table1, function (err, table1) {
      if (err) {
         throw err;
      }
      var table2 = "SELECT c.Concert_Name, COUNT(b.Booking_ID) AS Number_of_Booking FROM concert c, booking b, concert_showtime cs WHERE b.Concert_ShowTime_ID = cs.Concert_ShowTime_ID AND cs.Concert_ID = c.Concert_ID GROUP BY cs.Concert_ShowTime_ID ORDER BY Number_of_Booking DESC;"
      connection.query(table2, function (err, table2) {
         if (err) {
            throw err;
         }
         var table3 = "SELECT * FROM venue ORDER BY Venue_SeatingCapacity DESC;"
         connection.query(table3, function (err, table3) {
            if (err) {
               throw err;
            }
            var table4 = "SELECT p.Payment_Name, COUNT(b.Booking_ID) AS Number FROM payment p, booking b WHERE b.Payment_ID = p.Payment_ID GROUP BY p.Payment_ID ORDER BY Number DESC;";
            connection.query(table4, function (err, table4) {
               if (err) {
                  throw err;
               }
               var table5 = "SELECT c.Concert_Name, COUNT(ca.Concert_Artist_ID) AS Number FROM concert c, concert_artist ca WHERE c.Concert_ID = ca.Concert_Artist_ID GROUP BY ca.Concert_ID   ORDER BY Number DESC;"
               connection.query(table5, function (err, table5) {
                  if (err) {
                     throw err;
                  }
                  var table6 = "SELECT c.Concert_Name, COUNT(b.Booking_ID) AS Number_of_Booking FROM concert c, booking b, concert_showtime cs WHERE b.Concert_ShowTime_ID = cs.Concert_ShowTime_ID AND cs.Concert_ID = c.Concert_ID GROUP BY cs.Concert_ShowTime_ID ORDER BY Number_of_Booking DESC;"
                  connection.query(table6, function (err, table6) {
                     if (err) {
                        throw err;
                     }
                     var table7 = "SELECT";
                     connection.query(table7, function (err, table7) {
                        if (err) {
                           throw err;
                        }
                        var table8 = "SELECT c.Concert_Name, COUNT(b.Booking_ID) AS Number_of_Booking FROM concert c, booking b, concert_showtime cs WHERE b.Concert_ShowTime_ID = cs.Concert_ShowTime_ID AND cs.Concert_ID = c.Concert_ID GROUP BY cs.Concert_ShowTime_ID ORDER BY Number_of_Booking DESC;"
                        connection.query(table8, function (err, table8) {
                           if (err) {
                              throw err;
                           }
                           var table9 = "SELECT c.Concert_Name, COUNT(b.Booking_ID) AS Number_of_Booking FROM concert c, booking b, concert_showtime cs WHERE b.Concert_ShowTime_ID = cs.Concert_ShowTime_ID AND cs.Concert_ID = c.Concert_ID GROUP BY cs.Concert_ShowTime_ID ORDER BY Number_of_Booking DESC;"
                           connection.query(table9, function (err, table9) {
                              if (err) {
                                 throw err;
                              }
                              var table10 = "SELECT";
                              connection.query(table10, function (err, table10) {
                                 if (err) {
                                    throw err;
                                 }
                                 var table11 = "SELECT c.Concert_Name, COUNT(b.Booking_ID) AS Number_of_Booking FROM concert c, booking b, concert_showtime cs WHERE b.Concert_ShowTime_ID = cs.Concert_ShowTime_ID AND cs.Concert_ID = c.Concert_ID GROUP BY cs.Concert_ShowTime_ID ORDER BY Number_of_Booking DESC;"
                                 connection.query(table11, function (err, table11) {
                                    if (err) {
                                       throw err;
                                    }
                                    var table12 = "SELECT c.Concert_Name, COUNT(b.Booking_ID) AS Number_of_Booking FROM concert c, booking b, concert_showtime cs WHERE b.Concert_ShowTime_ID = cs.Concert_ShowTime_ID AND cs.Concert_ID = c.Concert_ID GROUP BY cs.Concert_ShowTime_ID ORDER BY Number_of_Booking DESC;"
                                    connection.query(table12, function (err, table12) {
                                       if (err) {
                                          throw err;
                                       }
                                       res.render("./user/statistic",{
                                          table1 : table1,
                                          table2 : table2,
                                          table3 : table3,
                                          talbe4 : table4,
                                          table5 : table5,
                                          table6 : table6,
                                          table7 : table7,
                                          talbe8 : table8,
                                          table9 : table9,
                                          table10 : table10,
                                          table11 : table11,
                                          talbe12 : table12
                                       })
                                    });
                                 });
                              });
                           });
                        });
                     });
                  });
               });
            });
         });
      });
   });
});


router.get("/profile", function (req, res) {
   var getMemberInfo = "SELECT * FROM member WHERE Member_Username = ?";
   connection.query(getMemberInfo, [req.session.username], function (err, member) {
      if (err) {
         throw err;
      }
      console.log(member);
      member.forEach(function (item) {
         item.Member_DOB = dateFormat(item.Member_DOB, "isoDate");
      });
      res.render("./user/profile", {
         member: member[0]
      });
   });
});


router.post("/profile", function (req, res) {
   var name = req.body.name;
   var dob = req.body.date;
   var gender = req.body.gender;
   var email = req.body.email;
   var address = req.body.address;
   var phoneNumber = req.body.phone;
   var dateOfBirth = dateFormat(dob, "isoDate");
   var sql = "UPDATE member SET Member_Name = ?, Member_DOB = ? ,Member_Gender = ? ,Member_Address = ?, Member_EmailAddress = ?, Member_PhoneNumber = ? WHERE Member_Username = ?";
   connection.query(sql, [name, dateOfBirth, gender, email, address, phoneNumber, req.session.username], function (err, member) {
      if (err) {
         throw err;
      }
      res.redirect("/index");
   });
});




module.exports = router;