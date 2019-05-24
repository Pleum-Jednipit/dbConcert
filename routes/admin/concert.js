var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")


// add new concert
router.get("/concert/new", function (req, res) {
    var getVenue = "SELECT Venue_ID, Venue_Name FROM Venue"
    connection.query(getVenue, function (err, allVenue) {
       if (err) {
          throw err;
       }
       allVenue.forEach(function (venue) {
          console.log(venue.Venue_Name);
       });
       res.render("./admin/concert-index/concert/new", {
          venue: allVenue
       });
    });
 });
 
 router.post("/concert/new", function (req, res) {
    var sql = "INSERT INTO concert ( concert_Name, concert_sales_date,concert_sales_time, concert_detail,venue_ID) " +
       "VALUES (?,?,?,?)";
    var name = req.body.name;
    var date = req.body.saleDate;
    var time = req.body.saleTime;
    var detail = req.body.detail;
    var venueID = req.body.venueID;
    connection.query(sql, [name, date,time, detail, venueID], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 Concert is inserted");
       res.redirect("/admin");
    });
 });
 
 
 router.get("/concert/select/:type", function (req, res) {
    var type = req.params.type;
    var getConcert = "SELECT concert_ID, concert_Name FROM concert"
    connection.query(getConcert, function (err, allConcert) {
       if (err) {
          throw err;
       }
       allConcert.forEach(function (concert) {
          console.log(concert.concert_Name);
       });
       res.render("./admin/concert-index/concert/select", {
          concert: allConcert, type: type
       });
    });
 });
 
 router.get("/concert/:name/:id/edit", function (req, res) {
    var concertID = req.params.id;
    var concertName = req.params.name;
    console.log(concertID + concertName);
    var getConcert = "SELECT * FROM concert WHERE concert_id = ?" ;
    connection.query(getConcert,[concertID], function (err, concert) {
       if (err) {
          throw err;
       }
       var getCurrentVenue = "SELECT Venue_Name FROM venue WHERE Venue_ID = ?";
       connection.query(getCurrentVenue,[concert[0].Venue_ID], function (err, currentVenue) {
          if (err) {
             throw err;
          }
          var getVenue = "SELECT Venue_ID,Venue_Name FROM venue;";
          connection.query(getVenue, function (err, allVenue) {
            if (err) {
               throw err;
            }
            console.log(allVenue);
            res.render("./admin/concert-index/concert/edit", {
                concert: concert[0], venue: allVenue, currentVenue: currentVenue[0]
                });
            });
       });
    });
 });
 
 router.put("/concert/:name/:id/edit", function (req, res) {
    var concertID = req.body.concertID;
    var name = req.body.name;
    var date = req.body.saleDate;
    var time = req.body.saleTime;
    var detail = req.body.detail;
    var poster = req.body.poster;
    var venue = req.body.venue;
    var sql = "UPDATE concert SET concert_Name = ?, concert_Sales_Date = ?,concert_Sales_Time = ?, Concert_Detail = ?, Concert_Poster = ?, Venue_ID = ? WHERE concert_ID = ?;"
    connection.query(sql,[name,date,time,detail,poster,venue,concertID], function (err, concert) {
       if (err) {
          throw err;
       }
       console.log(concert[0].Venue_ID);
    });
 });
 
 
 router.get("/concert/:name/:id/delete", function (req, res) {
    var concertID = req.params.id;
    var concertName = req.params.name;
    res.render("./admin/concert-index/concert/delete",{
          concertID : concertID, concertName: concertName
    });
 });
 
 router.post("/concert/:name/:id/delete", function (req, res) {
    var sql = "DELETE FROM concert where concert_ID = ?;"
    var concertID = req.params.id;
    connection.query(sql, [concertID], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("Delete!");
       res.redirect("/admin");
    });
 });


 module.exports = router;