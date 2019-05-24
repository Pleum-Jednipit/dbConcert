var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")

// add member type
router.get("/membertype", function (req, res) {
    res.render("./admin/promotion-index/member-type/new");
 });
 
 router.post("/membertype", function (req, res) {
    var sql = "INSERT INTO membertype ( MemberType_Name, MemberType_Detail) " +
       "VALUES (?,?)";
    var name = req.body.name;
    var detail = req.body.detail;
    connection.query(sql, [name, detail], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 Member Type Record is inserted");
       res.redirect("/admin/index");
    });
 });
 

 module.exports = router;
