var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")
var middleware = require("../../middleware");
var {
   isAdmin
} = middleware;

router.get("/login",function(req,res){
   res.render('./admin/login');
});
//handling user sign in
router.post("/login", function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   console.log("User: " + username);
   console.log("Pass: " +password);
   if (username && password) {
      var sql = 'SELECT * FROM admin WHERE username = ? AND password = ?';
      connection.query(sql, [username, password], function (error, results, fields) {
         console.log(results);
         if (results.length > 0) {
            req.session.isAdmin = true;
            req.session.username = username;
            console.log("HEere");

            res.redirect('/admin/index');
         } else {

            req.flash("error", "Invalid Username and Password");
            res.redirect('/admin/login');
         }
         res.end();
      });
   } else {
      res.send('Please enter Username and Password!');
      res.end();
   }
});


//logout routes
router.get("/logout",function (req, res) {
   console.log("Logout");
   req.session.destroy();
   res.redirect("/admin/login");
});

router.get("/index",  isAdmin,function (req, res) {
   res.render("./admin/index");
});

router.get("/concert/index",  isAdmin,function (req, res) {
   res.render("./admin/concert-index/index");
});

router.get("/concert-artist/index",  isAdmin,function (req, res) {
   res.render("./admin/concert-index/concert-artist/index");
});

router.get("/promotion/index",  isAdmin,function (req, res) {
   res.render("./admin/promotion-index/index");
});

router.get("/payment/index",  isAdmin,function (req, res) {
   res.render("./admin/payment-index/index");
});

module.exports = router;