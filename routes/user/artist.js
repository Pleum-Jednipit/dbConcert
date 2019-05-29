var express = require("express");
var router = express.Router();
const connection = require("../../connection");
var middleware = require("../../middleware");
var dateFormat = require('dateformat');

//root route landing 
router.get("/", function (req, res) {
    var getArtistInfo = "SELECT *  FROM artist";
    connection.query(getVenueInfo, function (err, artistInfo) {
       if (err) {
          throw err;
       }
       console.log(artistInfo)
       res.render("./user/artist/artistindex", {artist : artistInfo});
    });
 });

 router.get("/:name", function (req, res) {
    var artistName = req.params.name.split("-").join(" ");
    var getArtistInfo = "SELECT *  FROM artist WHERE Artist_Name = ?";
    connection.query(getArtistInfo,[artistName], function (err, artistInfo) {
       if (err) {
          throw err;
       }
       console.log(artistInfo[0])
       res.render("./user/artist/artistshow", {artist : artistInfo[0]});
    });
 });


module.exports = router;