var express = require("express");
var router = express.Router();
const connection = require("../../connection");
var middleware = require("../../middleware");
var dateFormat = require('dateformat');

//root route landing 
router.get("/", function (req, res) {
    var getArtistInfo = "SELECT a.* , rl.Record_Label_Name  FROM artist a , record_label rl WHERE a.Record_Label_ID = rl.Record_Label_ID GROUP BY a.Artist_ID;";
    connection.query(getArtistInfo, function (err, artistInfo) {
       if (err) {
          throw err;
       }
       console.log(artistInfo)
       res.render("./user/artist/artistindex", {artist : artistInfo});
    });
 });



module.exports = router;