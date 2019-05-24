var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")

// concert artist management
router.get("/select", function (req, res) {
    var getConcert = "SELECT concert_ID, concert_Name FROM concert";
    connection.query(getConcert, function (err, allConcert) {
       if (err) {
          throw err;
       }
       res.render("./admin/concert-index/concert-artist/management/select", {
          concert: allConcert
       });
    });
 });
 
 router.post("/select", function (req, res) {
    var concertName = req.body.concertName;
    var getArtist = "SELECT artist_ID, artist_Name FROM artist";
    var concertID = req.body.concertID;
    connection.query(getArtist, function (err, allArtist) {
       if (err) {
          throw err;
       }
       res.render("./admin/concert-index/concert-artist/management/new", {
          concertName: concertName,
          concertID: concertID,
          artist: allArtist
       });
    });
 });
 
 
 router.post("/new", function (req, res) {
    var sql = "INSERT INTO concert_artist ( concert_ID, artist_ID) " +
       "VALUES (?,?)";
    var concertID = req.body.concertID;
    var artistID = req.body.artistID;
    console.log(concertID);
    console.log(artistID);
    connection.query(sql, [concertID, artistID], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 Concert Artist is inserted");
       res.redirect("/admin/index");
    });
 });
 

 module.exports = router;
