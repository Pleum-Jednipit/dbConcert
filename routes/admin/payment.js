var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")

// add payment method 
router.get("/new", function (req, res) {
    res.render("./admin/payment-index/payment/new");
 });
 
 router.post("/new", function (req, res) {
    var sql = "INSERT INTO payment_method ( Payment_Method_Name ,Payment_Method_Description) " +
       "VALUES (?,?)";
    var name = req.body.name;
    var detail = req.body.detail;
    connection.query(sql, [name, detail], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 Payment Method Record is inserted");
       res.redirect("/admin/index");
    });
 });
 
 


 module.exports = router;