var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection");
var async = require('async');


router.get("/new", function (req, res) {
   var getAllConcert = "SELECT Concert_ID, Concert_Name FROM concert;" ;
   connection.query(getAllConcert, function (err, allConcert) {
      if (err) {
         throw err;
      }
   res.render("./admin/concert-index/concert-artist/management/new", {concert: "", search : allConcert});
   });
 });

router.post("/new", function (req, res) {
   var search    = req.body.search;
   var sqlSearch = "SELECT Concert_ID, Concert_Name FROM concert WHERE Concert_Name = ?;" ;
   connection.query(sqlSearch,[search], function (err, concert) {
      if (err) {
         throw err;
      }
      var getAllArtist = "SELECT Artist_Name, Artist_ID FROM artist";
      connection.query(getAllArtist, function (err, artist) {
         if (err) {
            throw err;
         }
         res.render("./admin/concert-index/concert-artist/management/new", { concert : concert[0], artist: artist});
      });
   });
});


 router.post("/new/insert", function (req, res) {
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
  
 router.get("/edit", function (req, res) {
      res.render("./admin/concert-index/concert-artist/management/edit", {concertArtist : ""});
 });

 router.post("/edit", function (req, res) {
    var allArtist = [];
    var search    = req.body.search;
    var sqlSearch = "SELECT ca.* FROM concert_artist ca, concert c WHERE ca.Concert_ID = c.Concert_ID AND c.Concert_Name = ?;" ;
    connection.query(sqlSearch,[search], function (err, allConcertArtist) {
       if (err) {
          throw err;
       }
       if(allConcertArtist[0]){ 
         async.forEachOf(allConcertArtist, function (concertArtist,none,callback) {
            var getArtist = "SELECT Artist_ID, Artist_Name FROM artist WHERE Artist_ID = ?";
            connection.query(getArtist,[concertArtist.Artist_ID], function (err, artist) {
               if (err) {
                  throw err;
               }
               var data = {
                  Concert_Artist_ID: concertArtist.Artist_ID,
                  Artist_ID: artist[0].Artist_ID,
                  Artist_Name: artist[0].Artist_Name
               };
               allArtist.push(data);
               callback(null);
            });
         }, function done() {
            console.log(allArtist);
            allArtist.forEach(function (item) {
               console.log(item.Artist_Name);
            });
            var getAllArtist = "SELECT Artist_Name, Artist_ID FROM artist";
            connection.query(getAllArtist, function (err, artist) {
               if (err) {
                  throw err;
               }
               res.render("./admin/concert-index/concert-artist/management/edit", { concertID: allConcertArtist[0].Concert_ID , concertArtist : allArtist, concertName : search, artist : artist});
            });
         });
      }
       else{
         res.render("./admin/concert-index/concert-artist/management/edit", { concertArtist: "none"});
       }
   });
 });
 
 router.put("/edit", function (req, res) {
    var update    = req.body.dropdown;
    var concertArtistID = req.body.concertArtistID;
    console.log(update);
    console.log(concertArtistID);
    var sql = "UPDATE concert_artist SET Artist_ID = ? WHERE Concert_Artist_ID = ? ;"
    console.log(Array.isArray(concertArtistID));
    if(Array.isArray(concertArtistID)){
      concertArtistID.forEach(function(item,index){
         connection.query(sql, [update[index],item], function (err, result) {
               if (err) {
                  throw err;
               }
               console.log("1 Concert Artist is Updates");
            });
       });
    }
    else{
         connection.query(sql, [update,concertArtistID], function (err, result) {
               if (err) {
                  throw err;
               }
               console.log("1 Concert Artist is Updates");
            });
    }
    res.redirect("/admin/concert/index");
 });
 
 router.get("/delete/:id", function (req, res) {
    var sql = "DELETE FROM concert_artist where Concert_Artist_ID = ?;"
    var Concert_Artist_ID = req.params.id
    console.log(concertID);
    connection.query(sql, [concertID], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("Delete!");
       res.redirect("/admin/concert-index/concert-artist/index");
    });
 });


 module.exports = router;

