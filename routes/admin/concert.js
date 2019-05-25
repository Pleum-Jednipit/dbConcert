var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")


// add new concert
router.get("/new", function (req, res) {
    var getVenue = "SELECT Venue_ID, Venue_Name FROM Venue";
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
 
 router.post("/new", function (req, res) {
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
       res.redirect("/admin/index");
    });
 });
  
 router.get("/edit", function (req, res) {
      console.log("ISUS");
      res.render("./admin/concert-index/concert/edit", {concert : ""});
 });

 router.post("/edit", function (req, res) {
    var concertSearch = req.body.concertSearch;
    var searchConcert = "SELECT * FROM concert WHERE concert_Name = ?" ;
    connection.query(searchConcert,[concertSearch], function (err, concert) {
       if (err) {
          throw err;
       }
       console.log(concert);
       if(concert[0]){
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
               res.render("./admin/concert-index/concert/edit", { concert: concert[0], venue: allVenue, currentVenue: currentVenue[0]});
            });
         });
       }
       else{
         res.render("./admin/concert-index/concert/edit", { concert: "none"});
       }
   });
 });
 
 router.put("/edit", function (req, res) {
    var concertID = req.body.concertID;
    var concertName = req.body.concertName;
    var date = req.body.saleDate;
    var time = req.body.saleTime;
    var detail = req.body.detail;
    var poster = req.body.poster;
    var venue = req.body.venue;
    var sql = "UPDATE concert SET concert_Name = ?, concert_Sales_Date = ?,concert_Sales_Time = ?, Concert_Detail = ?, Concert_Poster = ?, Venue_ID = ? WHERE concert_ID = ?;"
    connection.query(sql,[concertName,date,time,detail,poster,venue,concertID], function (err, concert) {
       if (err) {
          throw err;
       }
       console.log("Updated!")
       res.redirect("/admin/index");
    });
 });
 
 router.get("/delete/:id", function (req, res) {
    var sql = "DELETE FROM concert where concert_ID = ?;"
    var concertID = req.params.id
    console.log(concertID);
    connection.query(sql, [concertID], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("Delete!");
       res.redirect("/admin/concert/index");
    });
 });


 module.exports = router;