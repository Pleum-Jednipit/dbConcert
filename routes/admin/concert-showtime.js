var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection");
var async = require("async");

// add concert showtime
router.get("/new", function (req, res) {
   res.render("./admin/concert-index/concert-showtime/new", { concert : ""});
});

router.post("/new", function (req, res) {
   var search    = req.body.search;
   var sqlSearch = "SELECT Concert_ID, Concert_Name FROM concert WHERE Concert_Name = ?;" ;
   connection.query(sqlSearch,[search], function (err, concert) {
      if (err) {
         throw err;
      }
      res.render("./admin/concert-index/concert-showtime/new", { concert : concert[0]});
   });
 });
 
 router.post("/new/insert", function (req, res) {
   var concertID = req.body.concertID;
   var newShowdate = req.body.date;
   var newShowtime = req.body.time;
   var newPlan    = req.body.plan;
   var sql = "INSERT INTO concert_showtime (concert_showdate, concert_showtime,concert_showtime_plan,concert_ID) " +
         "VALUES (?,?,?,?)";
   if(Array.isArray(newShowdate)){
      newShowdate.forEach(function(item,index){
         connection.query(sql, [item,newShowtime[index],newPlan[index],concertID], function (err, result) {
            if (err) {
               throw err;
            }
            console.log("1 Concert Showtime is inserted");
         });
      });
   }
   else{
         connection.query(sql, [newShowdate,newShowtime,newPlan,concertID], function (err, result) {
            if (err) {
               throw err;
            }
            console.log("1 Concert Showtime is inserted");
         });
   }  
   res.redirect("/admin/concert/index");
 });
  
 router.get("/edit", function (req, res) {
      res.render("./admin/concert-index/concert-showtime/edit", {showtime : ""});
 });

 router.post("/edit", function (req, res) {
    var allShowtimeData = [];
    var search    = req.body.search;
    var sqlSearch = "SELECT cs.* FROM concert_showtime cs, concert c WHERE cs.Concert_ID = c.Concert_ID AND c.Concert_Name = ?;" ;
    connection.query(sqlSearch,[search], function (err, allShowtime) {
       if (err) {
          throw err;
       }
       if(allShowtime[0]){
         console.log(allShowtime);
         res.render("./admin/concert-index/concert-showtime/edit", { showtime : allShowtime, concertName : search}); 
      }
       else{
         res.render("./admin/concert-index/concert-showtime/edit", { showtime: "none"});
       }
   });
 });
 
 router.put("/edit", function (req, res) {
    var concertShowtimeID = req.body.concertShowtimeID;
    var concertID = req.body.concertID;
    var date =req.body.date;
    var time = req.body.time;
    var plan = req.body.plan;
    var sql = "UPDATE concert_showtime SET Concert_ShowDate = ?, Concert_ShowTime = ?, Concert_ShowTime_Plan = ? WHERE Concert_ShowTime_ID = ? ;"
    if(Array.isArray(concertShowtimeID)){
         concertShowtimeID.forEach(function(item,index){
            connection.query(sql, [date[index],time[index],plan[index],item], function (err, result) {
                  if (err) {
                     throw err;
                  }
                  console.log("1 Concert Showtime is Updates");
               });
          });
       }
       else{
            connection.query(sql, [date,time,plan,concertShowtimeID], function (err, result) {
                  if (err) {
                     throw err;
                  }
                  console.log("1 Concert Showtime is Updates");
               });
       }
    res.redirect("/admin/concert-artist/index");
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
 

 module.exports = router;
