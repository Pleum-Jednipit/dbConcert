var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")
var dateFormat = require('dateformat');
var middleware = require("../../middleware");
var {
   isAdmin
} = middleware;


// add new concert
router.get("/new",function (req, res) {
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
 
 router.post("/new",function (req, res) {
    var sql = "INSERT INTO concert ( concert_Name, concert_sales_date,concert_sales_time, concert_detail,venue_ID,Concert_Poster) " +
       "VALUES (?,?,?,?,?,?)";
    var name = req.body.name;
    var date = req.body.date;
    var time = req.body.time;
    var detail = req.body.detail;
    var venueID = req.body.venueID;
    var poster = req.body.poster;
    console.log("before" + date);
    connection.query(sql, [name,dateFormat(date,"isoDate"),time, detail, venueID,poster], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 Concert is inserted");
       res.redirect("/admin/concert/index");
    });
 });

 router.get("/:id/new",function (req, res) {
    var concertID = req.params.id;
    var search    = req.body.search;
   var sqlSearch = "SELECT Concert_ID, Concert_Name FROM concert WHERE Concert_ID = ?;" ;
   connection.query(sqlSearch,[concertID], function (err, concert) {
      if (err) {
         throw err;
      }
      var getAllArtist = "SELECT Artist_Name, Artist_ID FROM artist";
      connection.query(getAllArtist, function (err, artist) {
         if (err) {
            throw err;
         }
         res.render("./admin/concert-index/concert/addconcertartist", { concert : concert[0], artist: artist});
      });
   });
});


router.post("/:id/new",function (req, res) {
   var concertID = req.body.concertID;
   var newArtist = req.body.dropdown;
   var sql = "INSERT INTO concert_artist (concert_id, artist_id) " +
         "VALUES (?,?)";
   if(Array.isArray(newArtist)){
      newArtist.forEach(function(item){
         connection.query(sql, [concertID,item], function (err, result) {
            if (err) {
               throw err;
            }
            console.log("1 Concert Artist is inserted");
         });
      });
   }
   else{
         connection.query(sql, [concertID,newArtist], function (err, result) {
            if (err) {
               throw err;
            }
            console.log("1 Concert Artist is inserted");
         });
     
   } 
   res.redirect("/admin/concert-artist/index"); 
});




  
 router.get("/edit",function (req, res) {
      var sqlSearch = "SELECT * FROM concert" ;
      connection.query(sqlSearch, function (err, search) {
         if (err) {
            throw err;
         }
      res.render("./admin/concert-index/concert/edit", {concert : "", search : search});
      });
 });

 router.post("/edit", function (req, res) {
    var concertSearch = req.body.dropdown;
    var searchConcert = "SELECT * FROM concert WHERE concert_Name = ?" ;
    connection.query(searchConcert,[concertSearch], function (err, concert) {
       if (err) {
          throw err;
       }
      //  concert.forEach(function(item){
      //    item.Concert_Sales_Date = dateFormat(item.Concert_Sales_Date,"isoDate");
      //  });
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
               var sqlSearch = "SELECT * FROM concert" ;
               connection.query(sqlSearch, function (err, search) {
                  if (err) {
                     throw err;
                  }
               res.render("./admin/concert-index/concert/edit", { concert: concert[0], venue: allVenue, currentVenue: currentVenue[0], search : search});
               });
            });
         });
       }
       else{
         res.render("./admin/concert-index/concert/edit", { concert: "none"});
       }
   });
 });
 
 router.put("/edit", isAdmin,function (req, res) {
    var concertID = req.body.concertID;
    var concertName = req.body.concertName;
    var date = req.body.date;
    var time = req.body.time;
    var detail = req.body.detail;
    var poster = req.body.poster;
    var venue = req.body.venue;
    date = dateFormat(date,"isoDate");
    var sql = "UPDATE concert SET concert_Name = ?, concert_Sales_Date = ?, concert_Sales_Time = ?, Concert_Detail = ?, Concert_Poster = ?, Venue_ID = ? WHERE concert_ID = ?;"
    connection.query(sql,[concertName,date,time,detail,poster,venue,concertID], function (err, concert) {
       if (err) {
          throw err;
       }
       console.log("Updated!")
       res.redirect("/admin/concert/index");
    });
 });
 
 router.get("/delete/:id", isAdmin,function (req, res) {
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