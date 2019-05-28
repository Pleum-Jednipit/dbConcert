var express = require("express");
var router = express.Router();
const connection = require("../../connection");
var middleware = require("../../middleware");
var { isUser } = middleware;
var dateFormat = require('dateformat');
var async = require("async");


//root route landing 
router.get("/",function (req, res) {
   console.log("saf");
   res.render("./user/concert/concert");
});

router.get("/:name",function (req, res) {
   // SELECT * FROM concert c, concert_showtime cs, concert_artist ca, artist a WHERE c.Concert_Name = 'Tiger World Tour' AND c.Concert_ID = cs.Concert_ID AND c.Concert_ID = ca.Concert_ID AND ca.Artist_ID = a.Artist_ID; 
   var name = req.params.name;
   console.log(name);
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
            res.render("./user/concert/concertinfo", {concert : concert , artist : artist, venue: venue[0], name: name},);
         });
      });
   });
});

router.get("/:name/showtime",function (req, res) {
   var name = req.params.name;
   var concertName = name.split("-").join(" ");
   var getConcert = "SELECT * FROM concert c, concert_showtime cs WHERE c.Concert_Name = ? AND c.Concert_ID = cs.Concert_ID;";
   connection.query(getConcert,[concertName], function (err,concert) {
      if (err) {
         throw err;
      }
      var getAllZone = "SELECT z.* FROM zone z, concert_showtime cs, concert c WHERE c.Concert_Name = ? AND c.Concert_ID = cs.Concert_ID AND z.Concert_ShowTime_ID = cs.Concert_ShowTime_ID;"
       connection.query(getAllZone,[concertName], function (err, zone) {
         if (err) {
            throw err;
         }
         concert.forEach(function(item){
            item.Concert_ShowDate = dateFormat(item.Concert_ShowDate,"fullDate");
            console.log(item.Concert_ShowDate);
         });
         // var zoneID = [];
         // zone.forEach(function(item){
         //    zoneID.push(item.Zone_ID);
         // });
         // async.forEachOf(zoneID, function (id,none,callback) {
         //    var getAllSeat = "SELECT s.*, z.Zone_Name, z.Concert_ShowTime_ID FROM seat s, zone z WHERE z.Zone_ID = s.Zone_ID AND z.Zone_ID = ?";
         //    connection.query(getAllSeat,[id], function (err,seat) {
         //       if (err) {
         //          throw err;
         //       }
         //       console.log("test");
         //       // var data = {
         //       //    Concert_Artist_ID: concertArtist.Artist_ID,
         //       //    Artist_ID: artist[0].Artist_ID,
         //       //    Artist_Name: artist[0].Artist_Name
         //       // };
         //       // allArtist.push(data);
         //       console.log(seat);
         //       callback(null)s;
         //    });
         // }, function done() {
         //    // console.log(allArtist);
         // });
         var getVenue = "SELECT Venue_Name FROM venue v, concert c WHERE Concert_Name = ? AND c.Venue_ID = v.Venue_ID;";
         connection.query(getVenue,[concertName], function (err, venue) {
            if (err) {
               throw err;
            }
         console.log(zone);
         res.render("./user/concert/selectshowtime", {concert: concert, venue: venue[0], name:name, selectedShowtime: ""});
         });
      });
   });
});

// showtimeID , seat quantity , seat number
router.get("/:name/showtime/:showtime",function (req, res) {
   var zoneInfo = [];
   var name = req.params.name;
   var concertName = name.split("-").join(" ");
   var showtimeID = req.params.showtime;
   var getConcert = "SELECT * FROM concert c, concert_showtime cs WHERE c.Concert_Name = ? AND c.Concert_ID = cs.Concert_ID;";
   connection.query(getConcert,[concertName], function (err,concert) {
      if (err) {
         throw err;
      }
   var getAllZone = "SELECT * FROM zone z, concert_showtime cs WHERE cs.Concert_ShowTime_ID = ? AND z.Concert_ShowTime_ID = cs.Concert_ShowTime_ID;"
   connection.query(getAllZone,[showtimeID], function (err, zone) {
      if (err) {
         throw err;
      }
      concert.forEach(function(item){
         item.Concert_ShowDate = dateFormat(item.Concert_ShowDate,"fullDate");
         console.log(item.Concert_ShowDate);
      });
      var zoneID = [];
         zone.forEach(function(item){
            zoneID.push(item.Zone_ID);
         });
      async.forEachOf(zoneID, function (ID,none,callback) {
            var getAllBookedSeat = "SELECT z.Zone_Capacity - COUNT(bs.Booked_Seat_ID) AS Avaiable, z.Zone_Name FROM booked_seat bs, zone z , seat s WHERE bs.Seat_ID = s.Seat_ID AND s.Zone_ID = z.Zone_ID AND z.Zone_ID = ?";
            connection.query(getAllBookedSeat,[ID], function (err,info) {
               if (err) {
                  throw err;
               }
               console.log("Check");
               zoneInfo.push(info[0]);
               callback(null);
            });
         }, function done() {
            console.log(zoneInfo);
            var getVenue = "SELECT Venue_Name FROM venue v, concert c WHERE Concert_Name = ? AND c.Venue_ID = v.Venue_ID;";
            connection.query(getVenue,[concertName], function (err, venue) {
               if (err) {
                  throw err;
               }
            res.render("./user/concert/selectshowtime", {concert: concert, zoneInfo: zoneInfo, venue: venue[0], name:name, selectedShowtime: showtimeID})
            });
         });
      });
   });
});



router.get("/:name/showtime/:showtime/:zone",function (req, res) {
   var name = req.params.name;
   var concertName = name.split("-").join(" ");
   var showtimeID = req.params.showtime;
   var zoneID = req.params.zoneID;
   var getAllSeat = "SELECT s.*, z.Zone_Name, z.Concert_ShowTime_ID FROM seat s, zone z WHERE z.Zone_ID = s.Zone_ID AND z.Zone_ID = ?";
   connection.query(getAllSeat,[zoneID], function (err, venue) {
      if (err) {
         throw err;
      }
   });

});


// router.get("/:name/showtime/:id",function (req, res) {
//    var name = req.params.name;
//    var concertShowtimeID = req.params.id;
//    var concertName = name.split("-").join(" ");
//    var getConcert = "SELECT * FROM concert c, concert_showtime cs WHERE c.Concert_Name = ? AND c.Concert_ID = cs.Concert_ID;";
//    connection.query(getConcert,[concertName], function (err,concert) {
//       if (err) {
//          throw err;
//       }
//       var getAllZone = "SELECT * FROM zone z, concert_showtime cs, concert c WHERE c.Concert_Name = ? AND c.Concert_ID = cs.Concert_ID AND z.Concert_ShowTime_ID = cs.Concert_ShowTime_ID;"
//        connection.query(getAllZone,[concertName], function (err, zone) {
//          if (err) {
//             throw err;
//          }
//          concert.forEach(function(item){
//             item.Concert_ShowDate = dateFormat(item.Concert_ShowDate,"fullDate");
//             console.log(item.Concert_ShowDate);
//          });
//          var getVenue = "SELECT Venue_Name FROM venue v, concert c WHERE Concert_Name = ? AND c.Venue_ID = v.Venue_ID;";
//          connection.query(getVenue,[concertName], function (err, venue) {
//             if (err) {
//                throw err;
//             }
//          res.render("./user/concert/selectshowtime", {concert: concert, zone: zone, venue: venue[0], name:name });
//          });
//       });
//    });
// });






module.exports = router;






{/* <script type="text/javascript">
    $(document).ready(function () {
        $("select").change(function () {
            $(this).find("option:selected").each(function () {
                var optionValue = $(this).attr("value");
                if (optionValue) {
                    $(".box").not("." + optionValue).hide();
                    $("." + optionValue).show();
                } else {
                    $(".box").hide();
                }
            });
        }).change();
    });
</script> */}



// Create Drop Down
            // var zone = JSON.parse('<%-JSON.stringify(zone)%>');
            // var dropdown = document.getElementById('zone');
            // dropdown.options.length = 0;
            // var label = document.createElement('option');
            // label.text = "--Please Select Zone--"; 
            // dropdown.add(label, 0);
            // zone.forEach(function(item,index){
            //     if(showtime == item.Concert_ShowTime_ID){
            //         var option = document.createElement('option');
            //         option.text = option.value = item.Zone_Name;
            //         dropdown.add(option, 0);
            //         }
            // });


             // function zone_change() {
        //     var dropdown = document.getElementById('zone');
        //     var zoneName = JSON.parse('<%-JSON.stringify(zone)%>');
        //     zoneName.forEach(function(item){
        //         if(dropdown.value == item.Zone_Name){
        //             if(item.Zone_Type == "Seating"){
        //                 $('#Seating').removeClass("d-none").addClass("d-block");
        //                 $('#Standing').removeClass("d-block").addClass("d-none");
                       
        //                 console.log("Seating");
        //             } else{
        //                 $('#Standing').removeClass("d-none").addClass("d-block");
        //                 $('#Seating').removeClass("d-block").addClass("d-none");
                       
        //                 console.log("Standing");
        //             }
        //         }
        //     });
        // }