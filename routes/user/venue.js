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
       res.render("./user/venue", {venueInfo : venueInfo});
    });
 });


module.exports = router;