var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../connection")

//root route
router.get("/", function (req, res) {
   res.render("./admin/admin");
});

// add new venue
router.get("/venue", function (req, res) {
   res.render("./admin/venue");
});

router.post("/venue", function (req, res) {
   var sql = "INSERT INTO venue ( Venue_Name, Venue_Address , Venue_EmailAddress , Venue_PhoneNumber,Venue_SeatingCapacity) " +
      "VALUES (?,?,?,?,?)";
   var name = req.body.name;
   var email = req.body.email;
   var address = req.body.address;
   var phoneNumber = req.body.phoneNumber;
   var seatingCapacity = req.body.seatingCapacity;
   connection.query(sql, [name, address, email, phoneNumber, seatingCapacity], function (err, result) {
      if (err) {
         throw err;
      }
      console.log("1 Venue Record is inserted");
      res.redirect("/admin");
   });
});

// add member type
router.get("/membertype", function (req, res) {
   res.render("./admin/membertype");
});

router.post("/membertype", function (req, res) {
   var sql = "INSERT INTO membertype ( MemberType_Name, MemberType_Detail) " +
      "VALUES (?,?)";
   var name = req.body.name;
   var detail = req.body.detail;
   connection.query(sql, [name, detail], function (err, result) {
      if (err) {
         throw err;
      }
      console.log("1 Member Type Record is inserted");
      res.redirect("/admin");
   });
});


// add payment method 
router.get("/payment-method", function (req, res) {
   res.render("./admin/paymentmethod");
});

router.post("/payment-method", function (req, res) {
   var sql = "INSERT INTO payment_method ( Payment_Method_Name ,Payment_Method_Description) " +
      "VALUES (?,?)";
   var name = req.body.name;
   var detail = req.body.detail;
   connection.query(sql, [name, detail], function (err, result) {
      if (err) {
         throw err;
      }
      console.log("1 Payment Method Record is inserted");
      res.redirect("/admin");
   });
});


// add payment method 
router.get("/payment-method", function (req, res) {
   res.render("./admin/paymentmethod");
});

router.post("/payment-method", function (req, res) {
   var sql = "INSERT INTO payment_method ( Payment_Method_Name ,Payment_Method_Description) " +
      "VALUES (?,?)";
   var name = req.body.name;
   var detail = req.body.detail;
   connection.query(sql, [name, detail], function (err, result) {
      if (err) {
         throw err;
      }
      console.log("1 Payment Method Record is inserted");
      res.redirect("/admin");
   });
});




// add ticket receiving
router.get("/ticket-receiving", function (req, res) {
   res.render("./admin/ticket-receiving");
});

router.post("/ticket-receiving", function (req, res) {
   var sql = "INSERT INTO ticket_receiving_method ( Ticket_Receiving_Name ,Ticket_Receiving_Description, Ticket_Receiving_Price) " +
      "VALUES (?,?,?)";
   var name = req.body.name;
   var detail = req.body.detail;
   var price = req.body.price
   connection.query(sql, [name, detail, price], function (err, result) {
      if (err) {
         throw err;
      }
      console.log("1 Ticket Receiving Record is inserted");
      res.redirect("/admin");
   });
});

// add record label
router.get("/record-label", function (req, res) {
   res.render("./admin/record-label");
});

router.post("/record-label", function (req, res) {
   var sql = "INSERT INTO record_label ( record_label_Name, record_label_Address , Record_Label_EmailAddress , record_label_PhoneNumber, record_label_website) " +
      "VALUES (?,?,?,?,?)";
   var name = req.body.name;
   var address = req.body.address;
   var email = req.body.email;
   var phoneNumber = req.body.phoneNumber;
   var website = req.body.website;
   connection.query(sql, [name, address, email, phoneNumber, website], function (err, result) {
      if (err) {
         throw err;
      }
      console.log("1 Record Label is inserted");
      res.redirect("/admin");
   });
});


// add artist
router.get("/artist", function (req, res) {
   var getRecordLabel = "SELECT Record_Label_ID, Record_Label_Name FROM Record_Label"
   connection.query(getRecordLabel, function (err, allRecordLabel) {
      if (err) {
         throw err;
      }
      allRecordLabel.forEach(function (recordLabel) {
         console.log(recordLabel.Record_Label_Name);
      });
      res.render("./admin/artist", {
         recordLabel: allRecordLabel
      });
   });

});

router.post("/artist", function (req, res) {
   var sql = "INSERT INTO artist ( artist_Name, artist_detail , Record_Label_ID) " +
      "VALUES (?,?,?)";
   var name = req.body.name;
   var detail = req.body.detail;
   var recordLabel = req.body.recordLabel;
   connection.query(sql, [name, detail, recordLabel], function (err, result) {
      if (err) {
         throw err;
      }
      console.log("1 Artist is inserted");
      res.redirect("/admin");
   });
});


// add new promotion
router.get("/promotion", function (req, res) {
   res.render("./admin/promotion");
});

router.post("/promotion", function (req, res) {
   var sql = "INSERT INTO promotion ( Promotion_Name, Promotion_Start, Promotion_End , Promotion_Description) " +
      "VALUES (?,?,?,?)";
   var name = req.body.name;
   var start = req.body.start;
   var end = req.body.end;
   var detail = req.body.detail;
   connection.query(sql, [name, start, end, detail], function (err, result) {
      if (err) {
         throw err;
      }
      console.log("1 Promotion is inserted");
      res.redirect("/admin");
   });
});

// add concert showtime
router.get("/concert-showtime", function (req, res) {
   var getConcert = "SELECT concert_id, concert_name FROM concert"
   connection.query(getConcert, function (err, allConcert) {
      if (err) {
         throw err;
      }
      res.render("./admin/concert/concert-showtime", {
         concert: allConcert
      });
   });
});

router.post("/concert-showtime", function (req, res) {
   var sql = "INSERT INTO concert_showtime ( concert_ShowTime, concert_showtime_plan, concert_id) " +
      "VALUES (?,?,?)";
   var date = req.body.saleDate;
   var time = req.body.saleTime;
   var plan = req.body.plan;
   var showDateTime = date + " " + time;
   var concertID = req.body.concertID;
   console.log(concertID);
   connection.query(sql, [showDateTime, plan, concertID], function (err, result) {
      if (err) {
         throw err;
      }
      console.log("1 Concert Showtime is inserted");
      res.redirect("/admin");
   });
});


// concert artist management
router.get("/concert-artist/select", function (req, res) {
   var getConcert = "SELECT concert_ID, concert_Name FROM concert";
   connection.query(getConcert, function (err, allConcert) {
      if (err) {
         throw err;
      }
      res.render("./admin/concert/concert-artist-select", {
         concert: allConcert
      });
   });
});

router.post("/concert-artist/select", function (req, res) {
   var concertName = req.body.concertName;
   var getArtist = "SELECT artist_ID, artist_Name FROM artist";
   var concertID = req.body.concertID;
   connection.query(getArtist, function (err, allArtist) {
      if (err) {
         throw err;
      }
      res.render("./admin/concert/concert-artist", {
         concertName: concertName,
         concertID: concertID,
         artist: allArtist
      });
   });
});


router.post("/concert-artist", function (req, res) {
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
      res.redirect("/admin");
   });
});


router.get("/concert-zone", function (req, res) {
   var getConcert = "SELECT concert_ID, concert_Name FROM concert";
   connection.query(getConcert, function (err, allConcert) {
      if (err) {
         throw err;
      }
      allConcert.forEach(function (concert) {
         console.log(concert.concert_Name);
      });
      res.render("./admin/concert/concert-zone", {
         concert: allConcert
      });
   });
});

router.post("/concert-zone", function (req, res) {
   var sql = "INSERT INTO zone (zone_name, zone_type, zone_price) " +
      "VALUES (?,?,?)";
   var name = req.body.name;
   var price = req.body.price;
   var type = req.body.type;
   var concertID = req.body.concertID;
   var row = req.body.row;
   var column = req.body.column;
   connection.query(sql, [name, type, price], function (err, result) {
      if (err) {
         throw err;
      }
      console.log("1 Concert Zone is inserted");
      var getZoneID = "SELECT Zone_ID FROM zone WHERE Zone_Name = '" + name + "' AND Concert_ID = " + "1" + ";"
      console.log(getZoneID);
      connection.query(getZoneID, function (err, zoneID) {
         if (err) {
            throw err;
         }
         console.log(zoneID);
         const alphabet = ["A", "B", "C", "D", "E"];
         var rowName = alphabet.slice(0, row);
         const number = ["1", "2", "3", "4", "5"];
         var rowNumber = number.slice(0, column);

         rowName.forEach(function (name) {
            rowNumber.forEach(function (number) {
               var createSeat = "INSERT INTO seat (seat_number,zone_ID) " +
                  "VALUES (?,?)";
               var seatNumber = name + number
               connection.query(createSeat, [seatNumber, zoneID], function (err, resukt) {
                  if (err) {
                     throw err;
                  }
                  console.log(seatNumber + " is inserted");
               })
            });
         });
      });
   });
});


module.exports = router;