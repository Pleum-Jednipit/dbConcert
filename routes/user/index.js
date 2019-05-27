var express = require("express");
var router  = express.Router();
const connection = require("../../connection")

//root route landing 
router.get("/", function(req, res){
    res.render("./user/landing");
});

// Index
router.get("/index", function(req, res){
    res.render("./user/index");
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
      res.render("./user/register");
   });
   
});

// Add member data into db
router.post("/register", function(req, res){
    var sql = "INSERT INTO member ( Member_Username, Member_Password, Member_Name, Member_DOB, Member_Gender, Member_EmailAddress , Member_Address , Member_PhoneNumber,MemberType_ID) " 
              + "VALUES (?,?,?,?,?,?,?,?,?)";
    var userName = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var dob  = req.body.date;
    var gender = req.body.gender;
    var email = req.body.email;
    var address = req.body.address;
    var phoneNumber = req.body.phone;
    connection.query(sql,[userName,password,name,dob,email,gender,address,phoneNumber,1],function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 Member Record inserted");
       res.redirect("/index");
    });
 });


//handling user sign in
router.post("/login",function(req,res){
     var username = req.body.username;
     var password = req.body.password;
    if (username && password) {
		connection.query('SELECT * FROM trader_data WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
                req.session.username = username;
                if(username === 'admin'){
                    res.redirect('/admin');
                }else{
                    res.redirect('/profiles/accounts');
                }
            }else {
				res.redirect('/');
			}
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
    }
});


//logout routes
router.get("/logout",function(req,res){
    req.session.destroy();
    res.redirect("/");
});


module.exports = router;





module.exports = router;