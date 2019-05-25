var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")


router.get("/new", function (req, res) {
   res.render("./admin/concert-index/concert-artist/management/new");
 });
 
 router.post("/new", function (req, res) {
    var sql = "INSERT INTO concert_artist (concert_id, artist_id) " +
       "VALUES (?,?)";
    var artistID = req.body.artistID;
    var concertID = req.body.concertID;
    connection.query(sql, [concertID,artistID], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 Concert Artist is inserted");
       res.redirect("/admin/concert/concert-artist/index");
    });
 });
  
 router.get("/edit", function (req, res) {
      res.render("./admin/concert-index/concert-artist/edit", {concertArtist : ""});
 });

 router.post("/edit", function (req, res) {
    var search    = req.body.concertName;
    var sqlSearch = "SELECT ca.* FROM concert_artist ca, concert c WHERE ca.Concert_ID = c.Concert_ID AND c.Concert_Name = ?;" ;
    connection.query(sqlSearch,[search], function (err, payment) {
       if (err) {
          throw err;
       }
       if(concertArtist[0]){
         res.render("./admin/payment-index/payment/edit", { concertArtist: concertArtist[0]});
       }
       else{
         res.render("./admin/payment-index/payment/edit", { concertArtist: "none"});
       }
   });
 });
 
 router.put("/edit", function (req, res) {
    var concertArtistID = req.body.concertArtistID;
    var artistID = req.body.artistID;
    var concertID = req.body.concertID;
    var sql = "UPDATE payment SET payment_Name = ?, payment_Detail = ?,payment_Fee = ? WHERE payment_ID = ?;"
    connection.query(sql,[paymentName,paymentDetail,paymentFee], function (err, concert) {
       if (err) {
          throw err;
       }
       console.log("Updated!")
       res.redirect("/admin/payment/index");
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
       res.redirect("/admin/concert-index/concert-artist/index");
    });
 });


 module.exports = router;
