var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")

// add concert showtime
router.get("/new", function (req, res) {
    var getConcert = "SELECT concert_id, concert_name FROM concert"
    connection.query(getConcert, function (err, allConcert) {
       if (err) {
          throw err;
       }
       res.render("./admin/concert-index/concert-showtime/new", {
          concert: allConcert
       });
    });
 });
 
 router.post("/new", function (req, res) {
    var sql = "INSERT INTO concert_showtime ( concert_ShowTime, concert_showtime_plan, concert_id) " +
       "VALUES (?,?,?)";
    var date = req.body.saleDate;
    var time = req.body.saleTime;
    var plan = req.body.plan;
    var showDateTime = date + " " + time;
    var concertID = req.body.concertID;
    console.log(concertID);
    connection.query(sql, [showDateTime, plan, concertID], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 Concert Showtime is inserted");
       res.redirect("/admin/index");
    });
 });
 

 module.exports = router;
