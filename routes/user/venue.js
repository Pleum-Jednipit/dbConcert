var express = require("express");
var router = express.Router();
const connection = require("../../connection");
var middleware = require("../../middleware");
var dateFormat = require('dateformat');

//root route landing 
router.get("/", function (req, res) {
    var getVenueInfo = "SELECT *  FROM venue";
    connection.query(getVenueInfo, function (err, venueInfo) {
       if (err) {
          throw err;
       }
       console.log(venueInfo)
       res.render("./user/venue/venueindex", {venue : venueInfo});
    });
 });

 router.get("/:name", function (req, res) {
    var venueName = req.params.name.split("-").join(" ");
    var getVenueInfo = "SELECT *  FROM venue WHERE Venue_Name = ?";
    connection.query(venueName, function (err, venueInfo) {
       if (err) {
          throw err;
       }
       console.log(venueInfo[0])
       res.render("./user/venue/venueshow", {venue : venueInfo[0]});
    });
 });


module.exports = router;