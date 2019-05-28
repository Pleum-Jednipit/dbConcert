var express = require("express");
var router = express.Router();
const connection = require("../../connection");
var middleware = require("../../middleware");
var {
   isUser
} = middleware;
var dateFormat = require('dateformat');
var async = require("async");


//root route landing 
router.get("/", function (req, res) {
   console.log("saf");
   res.render("./user/concert/concert");
});

router.get("/:name", function (req, res) {
   // SELECT * FROM concert c, concert_showtime cs, concert_artist ca, artist a WHERE c.Concert_Name = 'Tiger World Tour' AND c.Concert_ID = cs.Concert_ID AND c.Concert_ID = ca.Concert_ID AND ca.Artist_ID = a.Artist_ID; 
   var name = req.params.name;
   console.log(name);
   var concertName = name.split("-").join(" ");
   // Get concert and showtime info
   var getConcert = "SELECT * FROM concert c, concert_showtime cs WHERE c.Concert_Name = ? AND c.Concert_ID = cs.Concert_ID;";
   connection.query(getConcert, [concertName], function (err, concert) {
      if (err) {
         throw err;
      }
      var getAllArtist = "SELECT * FROM concert c, concert_artist ca, artist a WHERE c.Concert_Name = ? AND c.Concert_ID = ca.Concert_ID AND ca.Artist_ID = a.Artist_ID;"
      connection.query(getAllArtist, [concertName], function (err, artist) {
         if (err) {
            throw err;
         }
         concert.forEach(function (item) {
            item.Concert_ShowDate = dateFormat(item.Concert_ShowDate, "fullDate");
            console.log(item.Concert_ShowDate);
         })
         var getVenue = "SELECT Venue_Name FROM venue v, concert c WHERE Concert_Name = ? AND c.Venue_ID = v.Venue_ID;";
         connection.query(getVenue, [concertName], function (err, venue) {
            if (err) {
               throw err;
            }
            console.log(venue[0].Venue_Name);
            res.render("./user/concert/concertinfo", {
               concert: concert,
               artist: artist,
               venue: venue[0],
               name: name
            }, );
         });
      });
   });
});

//Show showtime and zone
router.get("/:name/showtime", function (req, res) {
   var name = req.params.name;
   var concertName = name.split("-").join(" ");
   var getConcert = "SELECT * FROM concert c, concert_showtime cs WHERE c.Concert_Name = ? AND c.Concert_ID = cs.Concert_ID;";
   connection.query(getConcert, [concertName], function (err, concert) {
      if (err) {
         throw err;
      }
      var getAllZone = "SELECT z.* FROM zone z, concert_showtime cs, concert c WHERE c.Concert_Name = ? AND c.Concert_ID = cs.Concert_ID AND z.Concert_ShowTime_ID = cs.Concert_ShowTime_ID;"
      connection.query(getAllZone, [concertName], function (err, zone) {
         if (err) {
            throw err;
         }
         concert.forEach(function (item) {
            item.Concert_ShowDate = dateFormat(item.Concert_ShowDate, "fullDate");
            console.log(item.Concert_ShowDate);
         });
         var getVenue = "SELECT Venue_Name FROM venue v, concert c WHERE Concert_Name = ? AND c.Venue_ID = v.Venue_ID;";
         connection.query(getVenue, [concertName], function (err, venue) {
            if (err) {
               throw err;
            }
            console.log(zone);
            res.render("./user/concert/selectshowtime", {
               concert: concert,
               venue: venue[0],
               name: name,
               selectedShowtime: ""
            });
         });
      });
   });
});

// Select Showtime and Zone
router.get("/:name/showtime/:showtime", function (req, res) {
   var zoneInfo = [];
   var name = req.params.name;
   var concertName = name.split("-").join(" ");
   var showtimeID = req.params.showtime;
   var getConcert = "SELECT * FROM concert c, concert_showtime cs WHERE c.Concert_Name = ? AND c.Concert_ID = cs.Concert_ID;";
   connection.query(getConcert, [concertName], function (err, concert) {
      if (err) {
         throw err;
      }
      var getAllZone = "SELECT * FROM zone z, concert_showtime cs WHERE cs.Concert_ShowTime_ID = ? AND z.Concert_ShowTime_ID = cs.Concert_ShowTime_ID;"
      connection.query(getAllZone, [showtimeID], function (err, zone) {
         if (err) {
            throw err;
         }
         concert.forEach(function (item) {
            item.Concert_ShowDate = dateFormat(item.Concert_ShowDate, "fullDate");
            console.log(item.Concert_ShowDate);
         });
         var zoneID = [];
         zone.forEach(function (item) {
            zoneID.push(item.Zone_ID);
         });
         async.forEachOf(zoneID, function (ID, none, callback) {
            var getAllBookedSeat = "SELECT z.Zone_Capacity - COUNT(bs.Booked_Seat_ID) AS Avaiable, z.Zone_Name ,z.Zone_Price FROM booked_seat bs, zone z , seat s WHERE bs.Seat_ID = s.Seat_ID AND s.Zone_ID = z.Zone_ID AND z.Zone_ID = ?";
            connection.query(getAllBookedSeat, [ID], function (err, info) {
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
            connection.query(getVenue, [concertName], function (err, venue) {
               if (err) {
                  throw err;
               }
               res.render("./user/concert/selectshowtime", {
                  concert: concert,
                  zoneInfo: zoneInfo,
                  venue: venue[0],
                  name: name,
                  selectedShowtime: showtimeID
               })
            });
         });
      });
   });
});


// Book seat
router.get("/:name/showtime/:showtime/:zone", function (req, res) {
   var name = req.params.name;
   var concertName = name.split("-").join(" ");
   var showtimeID = req.params.showtime;
   var zoneName = req.params.zone;
   console.log(zoneName);
   console.log(showtimeID);
   var getShowtime = "SELECT * FROM concert_showtime WHERE Concert_ShowTime_ID = ?;";
   connection.query(getShowtime, [showtimeID], function (err, showtime) {
      if (err) {
         throw err;
      }
      showtime[0].Concert_ShowDate = dateFormat(showtime[0].Concert_ShowDate, "fullDate");
      console.log(showtime);
      var getZone = "SELECT * FROM zone WHERE Zone_Name = ? AND Concert_ShowTime_ID = ?;";
      connection.query(getZone, [zoneName, showtimeID], function (err, zone) {
         if (err) {
            throw err;
         }
         console.log(zone);
         var getAllSeat = "SELECT * FROM seat WHERE Zone_ID = ?;";
         connection.query(getAllSeat, [zone[0].Zone_ID], function (err, allSeat) {
            if (err) {
               throw err;
            }
            console.log(allSeat)
            var getAllBookedSeat = "SELECT bs.*, s.Seat_Number FROM booked_seat bs, seat s WHERE bs.Seat_ID = s.Seat_ID AND s.Zone_ID = ?;";
            connection.query(getAllBookedSeat, [zone[0].Zone_ID], function (err, bookedSeat) {
               if (err) {
                  throw err;
               }
               console.log("CHeck");
               console.log(bookedSeat)
               var getVenue = "SELECT Venue_Name FROM venue v, concert c WHERE Concert_Name = ? AND c.Venue_ID = v.Venue_ID;";
               connection.query(getVenue, [concertName], function (err, venue) {
                  if (err) {
                     throw err;
                  }
                  var getTicket = "SELECT * FROM ticket_receiving";
                  connection.query(getTicket, function (err, ticket) {
                     if (err) {
                        throw err;
                     }
                     var getPayment = "SELECT * FROM payment;";
                     connection.query(getPayment, function (err, payment) {
                        if (err) {
                           throw err;
                        }
                        res.render("./user/concert/selectseat", {
                           showtime: showtime[0],
                           venue: venue[0],
                           zone: zone[0],
                           seat: allSeat,
                           bookedSeat: bookedSeat,
                           concertName: concertName,
                           ticket: ticket,
                           payment: payment,
                           name: name
                        })
                     });
                  });
               });
            });
         });
      });
   });
});


router.post("/:name/showtime/:showtime/:zone/booking", function (req, res) {
   var concertName = req.body.concertName;
   var concertShowtime = req.body.concertShowtime;
   var venueName = req.body.venueName;
   var zoneName = req.body.zoneName;
   var zoneID = req.body.zoneID;
   console.log("ID" + zoneID);
   var zonePrice = req.body.zonePrice;
   var ticketID = req.body.ticketID;
   var paymentID = req.body.paymentID;
   var showtimeID = req.params.showtime;
   var zoneType = req.body.zoneType;
   console.log(ticketID);
   console.log(paymentID);
   if (zoneType == "Seating") {
      var bookingSeat = req.body.zone;
      if (Array.isArray(bookingSeat)) {
         var quantity = bookingSeat.length;
      } else {
         var quantity = 1;
      }
   } else {
      var quantity = req.body.quantity;
   }
   var getTicket = "SELECT * FROM ticket_receiving WHERE Ticket_Receiving_ID = ?";
   connection.query(getTicket,[ticketID],function (err, ticket) {
      if (err) {
         throw err;
      }
      var getPayment = "SELECT * FROM payment;";
      connection.query(getPayment,[paymentID], function (err, payment) {
         if (err) {
            throw err;
         }
         var sqlBooking = "INSERT INTO booking ( Member_Username, Concert_ShowTime_ID,Booking_DateTime,Booking_Quantity, Ticket_Receiving_ID ,Payment_ID,Booking_Total_Price) " +
            "VALUES (?,?,?,?,?,?,?)";
         var now = new Date();
         console.log(showtimeID);
         var paymentFee = payment[0].Payment_Fee;
         var ticketFee = ticket[0].Ticket_Receiving_Fee;
         var total = (quantity * zonePrice) + paymentFee + ticketFee;
         console.log(total);
         var username = "test";
         connection.query(sqlBooking, [username, showtimeID, dateFormat(now, "isoDateTime"), quantity, ticketID, paymentID, total], function (err, venue) {
            if (err) {
               throw err;
            }
            console.log("1 Booking is Inserted")
            var getBookingID = "SELECT Booking_ID FROM booking WHERE Member_Username = ? ORDER BY Booking_ID DESC LIMIT 1";
            connection.query(getBookingID, [username], function (err, bookingID) {
               if (err) {
                  throw err;
               }
               var sqlBookedSeat = "INSERT INTO booked_seat (Seat_ID,Concert_ShowTime_ID,Booking_ID) " +
               "VALUES (?,?,?)";
               console.log(bookingSeat);
               console.log(bookingID);
               if(zoneType == "Seating"){
                  if(quantity > 1){
                     bookingSeat.forEach(function(item){
                        connection.query(sqlBookedSeat, [item,showtimeID,bookingID[0].Booking_ID], function (err, venue) {
                           if (err) {
                              throw err;
                           }
                           console.log(item + " is Booked")
                           
                        });
                     });
                  } else {
                        connection.query(sqlBookedSeat, [bookingSeat,showtimeID,bookingID[0].Booking_ID], function (err, venue) {
                           if (err) {
                              throw err;
                           }
                           console.log(bookingSeat + " is Booked")
                        });
                  }
               } else if(zoneType == "Standing"){
                     var quantityNumber = Number(quantity);
                     var getStandindSeat = "SELECT s.Seat_ID FROM seat s, zone z WHERE s.Zone_ID = ? AND NOT EXISTS(SELECT 1 FROM booked_seat bs WHERE bs.Seat_ID = s.Seat_ID) LIMIT ?;";
                     connection.query(getStandindSeat,[zoneID,quantityNumber],function (err, bookingSeat) {
                     if (err) {
                        throw err;
                        }
                        if(quantity > 1){
                           console.log("GO");
                           bookingSeat.forEach(function(item){
                              connection.query(sqlBookedSeat, [item.Seat_ID,showtimeID,bookingID[0].Booking_ID], function (err, venue) {
                                 if (err) {
                                    throw err;
                                 }
                                 console.log(item.Seat_ID + " is Booked")
                              });
                           });
                        } else {
                           console.log("Hi");
                           console.log(bookingSeat.Seat_ID);
                           connection.query(sqlBookedSeat, [bookingSeat[0].Seat_ID,showtimeID,bookingID[0].Booking_ID], function (err, venue) {
                              if (err) {
                                 throw err;
                              }
                              console.log(bookingSeat[0].Seat_ID + " is Booked")
                           });
                     }
                  });
                  }  
               res.send("Hi");
            });
         });
      });
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






{
   /* <script type="text/javascript">
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
   </script> */
}



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


{/* <div class="col-sm-3"></div>
                        <select name="test" id="test" class="form-control selectpicker" data-live-search="true">
                                <% ticket.forEach(function(item){ %>
                                    <option value="<%=item.Ticket_Receiving_ID %>"><%=item.Ticket_Receiving_Name %></option>
                                    <% }) %>
                         </select>
                </div> */}