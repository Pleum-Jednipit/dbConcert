var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")
var middleware = require("../../middleware");
var {
   isAdmin
} = middleware;



// add new promotion
router.get("/new", isAdmin,function (req, res) {
   var sql = "SELECT * FROM concert;";
   connection.query(sql, function (err, all) {
      if (err) {
         throw err;
      }
      res.render("./admin/promotion-index/promotion/new", {concert : all});
   });
 });
 
 router.post("/new",isAdmin, function (req, res) {
    var sql = "INSERT INTO promotion ( Promotion_Name, Promotion_Start, Promotion_End , Promotion_Detail,Concert_ID,Promotion_Discount) " +
       "VALUES (?,?,?,?,?,?)";
    var name = req.body.name;
    var start = req.body.startdate;
    var end = req.body.enddate;
    var detail = req.body.detail;
    var concertID = req.body.dropdown;
    var discount = req.body.discount;
    connection.query(sql, [name, start, end, detail,concertID,discount], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 Promotion is inserted");
       res.redirect("/admin/promotion/index");
    });
 });
 
 


 module.exports = router;
