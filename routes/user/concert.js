var express = require("express");
var router = express.Router();
const connection = require("../../connection");
var middleware = require("../../middleware");
var { isUser } = middleware;
var dateFormat = require('dateformat');


//root route landing 
router.get("/",function (req, res) {
   console.log("saf");
   res.render("./user/concert/concert");
});

router.get("/:name",function (req, res) {
   // SELECT * FROM concert c, concert_showtime cs, concert_artist ca, artist a WHERE c.Concert_Name = 'Tiger World Tour' AND c.Concert_ID = cs.Concert_ID AND c.Concert_ID = ca.Concert_ID AND ca.Artist_ID = a.Artist_ID; 
   var name = req.params.name;
   var concertName = name.split("-").join(" ");
   // Get concert and showtime info
   var getConcert = "SELECT * FROM concert c, concert_showtime cs WHERE c.Concert_Name = ? AND c.Concert_ID = cs.Concert_ID;";
    connection.query(getConcert,[concertName], function (err,concert) {
       if (err) {
          throw err;
       }
       var getAllArtist = "SELECT * FROM concert c, concert_artist ca, artist a WHERE c.Concert_Name = ? AND c.Concert_ID = ca.Concert_ID AND ca.Artist_ID = a.Artist_ID;"
       connection.query(getAllArtist,[concertName], function (err, artist) {
         if (err) {
            throw err;
         }
         concert.forEach(function(item){
            item.Concert_ShowDate = dateFormat(item.Concert_ShowDate,"fullDate");
            console.log(item.Concert_ShowDate);
         })
         var getVenue = "SELECT Venue_Name FROM venue v, concert c WHERE Concert_Name = ? AND c.Venue_ID = v.Venue_ID;";
         connection.query(getVenue,[concertName], function (err, venue) {
            if (err) {
               throw err;
            }
            console.log(venue[0].Venue_Name);
            res.render("./user/concert/show", {concert : concert , artist : artist, venue: venue[0]});
         });
      });
   });
});



module.exports = router;