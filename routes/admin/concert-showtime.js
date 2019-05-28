var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection");
var async = require("async");
var dateFormat = require('dateformat');
var middleware = require("../../middleware");
var {
   isAdmin
} = middleware;

// add concert showtime
router.get("/new",isAdmin, function (req, res) {
   res.render("./admin/concert-index/concert-showtime/new", { concert : ""});
});

router.post("/new", isAdmin,function (req, res) {
   var search    = req.body.search;
   var sqlSearch = "SELECT Concert_ID, Concert_Name FROM concert WHERE Concert_Name = ?;" ;
   connection.query(sqlSearch,[search], function (err, concert) {
      if (err) {
         throw err;
      }
      res.render("./admin/concert-index/concert-showtime/new", { concert : concert[0]});
   });
 });
 
 router.post("/new/insert",isAdmin, function (req, res) {
   var concertID = req.body.concertID;
   var newShowdate = req.body.date;
   var newShowtime = req.body.time;
   var newPlan    = req.body.plan;
   var sql = "INSERT INTO concert_showtime (Concert_ShowDate, Concert_ShowTime,Concert_Showtime_Plan,Concert_ID) " +
         "VALUES (?,?,?,?)";
   if(Array.isArray(newShowdate)){
      newShowdate.forEach(function(item,index){
         item = dateFormat(item,"isoDate");
         connection.query(sql, [item,newShowtime[index],newPlan[index],concertID], function (err, result) {
            if (err) {
               throw err;
            }
            console.log("1 Concert Showtime is inserted");
         });
      });
   }
   else{     
         connection.query(sql, [dateFormat(newShowdate,"isoDate"),newShowtime,newPlan,concertID], function (err, result) {
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

 router.post("/edit", isAdmin,function (req, res) {
    var allShowtimeData = [];
    var search    = req.body.search;
    var sqlSearch = "SELECT cs.* FROM concert_showtime cs, concert c WHERE cs.Concert_ID = c.Concert_ID AND c.Concert_Name = ?;" ;
    connection.query(sqlSearch,[search], function (err, allShowtime) {
       if (err) {
          throw err;
       }
       if(allShowtime[0]){
         allShowtime.forEach(function(item){
            item.Concert_ShowDate = dateFormat(item.Concert_ShowDate,"isoDate");
         });
         res.render("./admin/concert-index/concert-showtime/edit", { showtime : allShowtime, concertName : search}); 
      }
       else{
         res.render("./admin/concert-index/concert-showtime/edit", { showtime: "none"});
       }
   });
 });
 
 router.put("/edit",isAdmin, function (req, res) {
    var concertShowtimeID = req.body.concertShowtimeID;
    var concertID = req.body.concertID;
    var date =req.body.date;
    var time = req.body.time;
    var plan = req.body.plan;
    var sql = "UPDATE concert_showtime SET Concert_ShowDate = ?, Concert_ShowTime = ?, Concert_ShowTime_Plan = ? WHERE Concert_ShowTime_ID = ? ;"
    if(Array.isArray(concertShowtimeID)){
         concertShowtimeID.forEach(function(item,index){
            date[index] = dateFormat(date[index],"isoDate");
            connection.query(sql, [date[index],time[index],plan[index],item], function (err, result) {
                  if (err) {
                     throw err;
                  }
                  console.log("1 Concert Showtime is Updates");
               });
          });
       }
       else{
            date = dateFormat(date,"isoDate");
            connection.query(sql, [date,time,plan,concertShowtimeID], function (err, result) {
                  if (err) {
                     throw err;
                  }
                  console.log("1 Concert Showtime is Updates");
               });
       }
    res.redirect("/admin/concert-artist/index");
 });
 
 router.get("/delete/:id", isAdmin,function (req, res) {
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
