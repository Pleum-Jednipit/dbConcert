var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")

// add new promotion
router.get("/new", function (req, res) {
    res.render("./admin/promotion-index/promotion/new");
 });
 
 router.post("/new", function (req, res) {
    var sql = "INSERT INTO promotion ( Promotion_Name, Promotion_Start, Promotion_End , Promotion_Description) " +
       "VALUES (?,?,?,?)";
    var name = req.body.name;
    var start = req.body.start;
    var end = req.body.end;
    var detail = req.body.detail;
    connection.query(sql, [name, start, end, detail], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 Promotion is inserted");
       res.redirect("/admin/index");
    });
 });
 
 


 module.exports = router;
