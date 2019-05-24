var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")

router.get("/new", function (req, res) {
    var getConcert = "SELECT concert_ID, concert_Name FROM concert";
    connection.query(getConcert, function (err, allConcert) {
       if (err) {
          throw err;
       }
       allConcert.forEach(function (concert) {
          console.log(concert.concert_Name);
       });
       res.render("./admin/concert-index/concert-zone/new", {
          concert: allConcert
       });
    });
 });
 
 router.post("/new", function (req, res) {
    var sql = "INSERT INTO zone (zone_name, zone_type, zone_price) " +
       "VALUES (?,?,?)";
    var name = req.body.name;
    var price = req.body.price;
    var type = req.body.type;
    var concertID = req.body.concertID;
    var row = req.body.row;
    var column = req.body.column;
    connection.query(sql, [name, type, price], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 Concert Zone is inserted");
       var getZoneID = "SELECT Zone_ID FROM zone WHERE Zone_Name = '" + name + "' AND Concert_ID = " + "1" + ";"
       console.log(getZoneID);
       connection.query(getZoneID, function (err, zoneID) {
          if (err) {
             throw err;
          }
          console.log(zoneID);
          const alphabet = ["A", "B", "C", "D", "E"];
          var rowName = alphabet.slice(0, row);
          const number = ["1", "2", "3", "4", "5"];
          var rowNumber = number.slice(0, column);
 
          rowName.forEach(function (name) {
             rowNumber.forEach(function (number) {
                var createSeat = "INSERT INTO seat (seat_number,zone_ID) " +
                   "VALUES (?,?)";
                var seatNumber = name + number
                connection.query(createSeat, [seatNumber, zoneID], function (err, resukt) {
                   if (err) {
                      throw err;
                   }
                   console.log(seatNumber + " is inserted");
                })
             });
          });
       });
    });
 });
 

 module.exports = router;
