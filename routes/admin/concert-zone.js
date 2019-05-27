var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")

function updateSeat(zoneID, allSeat) {
   var getAllSeat = "SELECT * FROM seat WHERE zone_ID = ?;";
   connection.query(getAllSeat, [zoneID], function (err, seatID) {
      if (err) {
         throw err;
      }
      console.log("Remaining" + seatID);
      var updateSeat = "UPDATE seat SET seat_number = ? WHERE Seat_ID = ? ";
      allSeat.forEach(function (seat, index) {
         console.log("Remaining" + seatID[index].Seat_ID);
         connection.query(updateSeat, [seat, seatID[index].Seat_ID], function (err, result) {
            if (err) {
               throw err;
            }
            console.log(seat + " is Update");
         });
      });
   });
}

router.get("/select", function (req, res) {
   res.render("./admin/concert-index/concert-zone/select", {
      showtime: ""
   });
});

router.post("/select", function (req, res) {
   var search = req.body.search;
   var sqlSearch = "SELECT cs.* FROM concert_showtime cs, concert c WHERE cs.Concert_ID = c.Concert_ID AND c.Concert_Name = ?;";
   connection.query(sqlSearch, [search], function (err, allShowtime) {
      if (err) {
         throw err;
      }
      var name = search.split(" ").join("-");
      if (allShowtime[0]) {
         res.render("./admin/concert-index/concert-zone/select", {
            showtime: allShowtime,
            concertName: search,
            name: name
         });
      } else {
         res.render("./admin/concert-index/concert-zone/select", {
            showtime: "none"
         });
      }
   });
});

router.get("/select/:name/:id", function (req, res) {
   var concertShowtimeID = req.params.id;
   var concertName = req.params.name.split("-").join(" ");
   var sqlSearch = "SELECT * FROM concert_showtime WHERE Concert_Showtime_ID = ?;";
   connection.query(sqlSearch, concertShowtimeID, function (err, showtime) {
      if (err) {
         throw err;
      }
      var getAllZone = "SELECT * FROM zone WHERE concert_showtime_id = ?;";
      connection.query(getAllZone, concertShowtimeID, function (err, zone) {
         if (err) {
            throw err;
         }
         res.render("./admin/concert-index/concert-zone/showtime", {
            showtime: showtime,
            concertName: concertName,
            zone: zone,
            name: concertName.split(" ").join("-"),
            showtimeID: concertShowtimeID
         });
      });
   });
});

router.get("/new/:name/:id", function (req, res) {
   var concertShowtimeID = req.params.id;
   var concertName = req.params.name;
   var sqlSearch = "SELECT * FROM concert_showtime WHERE Concert_Showtime_ID = ?;";
   connection.query(sqlSearch, concertShowtimeID, function (err, showtime) {
      if (err) {
         throw err;
      }
      res.render("./admin/concert-index/concert-zone/new", {
         concertShowtimeID: concertShowtimeID,
         concertName: concertName
      });
   });
});

router.post("/new/:name/:id", function (req, res) {
   var concertShowtimeID = req.params.id;
   var concertName = req.params.name;
   console.log(concertName);
   var name = req.body.name;
   var type = req.body.type;
   var price = req.body.price;
   var allSeat = req.body.zone;
   console.log(allSeat);
   console.log(type);
   if (type == "Seating") {
      var capacity = allSeat.length;
   } else {
      var capacity = req.body.capacity;
      console.log(capacity);
      var count = [];
      for (var i = 0; i < capacity; i++) {
         count.push(i);
      }
      console.log(count);
   }
   var sql = "INSERT INTO zone (zone_name, zone_type, zone_price, zone_capacity, concert_showtime_id) " +
      "VALUES (?,?,?,?,?)";

   connection.query(sql, [name, type, price, capacity, concertShowtimeID], function (err, showtime) {
      if (err) {
         throw err;
      }
      var getZoneID = "SELECT MAX(zone_ID) AS Zone_ID FROM zone;";
      connection.query(getZoneID, function (err, zoneID) {
         if (err) {
            throw err;
         }
         console.log(zoneID[0].Zone_ID);
         var addSeat = "INSERT INTO seat (Seat_Number, zone_id)" +
            "VALUES (?,?)";
         if (type == "Seating") {
            allSeat.forEach(function (seat) {
               connection.query(addSeat, [seat, zoneID[0].Zone_ID], function (err, result) {
                  if (err) {
                     throw err;
                  }
                  console.log("1 Seat  is inserted");
               });
            });
         } else {
            console.log(count);
            count.forEach(function (item, index) {
               var seatNumber = name + index;
               connection.query(addSeat, [seatNumber, zoneID[0].Zone_ID], function (err, result) {
                  if (err) {
                     throw err;
                  }
                  console.log("1 Seat  is inserted");
               });
            });
         }
      });
      res.redirect("/admin/concert-zone/select/" + concertName + "/" + concertShowtimeID);
   });
});


router.get("/edit/:name/:id/:zone", function (req, res) {
   var concertShowtimeID = req.params.id;
   var concertName = req.params.name;
   var zoneID = req.params.zone;
   var sqlSearch = "SELECT * FROM zone WHERE zone_ID = ?;";
   connection.query(sqlSearch, zoneID, function (err, zone) {
      if (err) {
         throw err;
      }
      var getAllSeat = "SELECT Seat_Number FROM seat WHERE zone_ID = ?;";
      connection.query(getAllSeat, zoneID, function (err, seat) {
         if (err) {
            throw err;
         }
         console.log(seat);
         res.render("./admin/concert-index/concert-zone/edit", {
            concertShowtimeID: concertShowtimeID,
            concertName: concertName,
            zone: zone[0],
            seat: seat
         });
      });
   });
});

router.post("/edit/:name/:id/:zone", function (req, res) {
   var concertShowtimeID = req.params.id;
   var concertName = req.params.name;
   var zoneID = req.params.zone;
   var name = req.body.name;
   var type = req.body.type;
   var price = req.body.price;
   var allSeat = req.body.zone;
   if (type == "Seating") {
      var capacity = allSeat.length;
   } else {
      var capacity = req.body.capacity;
   }
   console.log(allSeat);
   var getZoneCapa = "SELECT Zone_Capacity FROM zone WHERE Zone_ID = ?;";
   connection.query(getZoneCapa, zoneID, function (err, zoneCapa) {
      if (err) {
         throw err;
      }
      console.log(capacity);
      console.log(zoneCapa[0].Zone_Capacity)
      var diff = capacity - zoneCapa[0].Zone_Capacity;
      console.log(diff);
      var count = Array(Math.abs(diff)).fill(1);
      console.log(count.length);
      var sql = "UPDATE zone SET zone_name = ? , zone_type = ?, zone_price = ?, zone_capacity = ? WHERE zone_id = ?; ";
      connection.query(sql, [name, type, price, capacity, zoneID], function (err, showtime) {
         if (err) {
            throw err;
         }
         var addSeat = "INSERT INTO seat (Seat_Number, zone_id)" +
            "VALUES (?,?)";
         if (type == "Seating") {
            if (diff > 0) {
               count.forEach(function (item, index) {
                  connection.query(addSeat, [
                     [index], zoneID
                  ], function (err, result) {
                     if (err) {
                        throw err;
                     }
                     console.log("1 Seat  is inserted");
                     updateSeat(zoneID, allSeat);
                  });
               });
            } else if (diff < 0) {
               var getAllSeat = "SELECT * FROM seat WHERE zone_ID = ?;";
               connection.query(getAllSeat, [zoneID], function (err, seatID) {
                  if (err) {
                     throw err;
                  }
                  var seatDeleted = [];
                  seatID.forEach(function (item) {
                     if (!allSeat.includes(item.Seat_ID)) {
                        seatDeleted.push(item.Seat_ID);
                     }
                  });
                  var deleteSeat = "DELETE FROM seat WHERE seat_id = ?;";
                  count.forEach(function (item, index) {
                     connection.query(deleteSeat, [seatDeleted[index], Math.abs(diff)], function (err, result) {
                        if (err) {
                           throw err;
                        }
                        console.log(seatDeleted[index] + "  is deleted");
                        updateSeat(zoneID, allSeat);
                     });
                  });
               });
            }
         } else {
            ///// STANDING ///////
            if (diff > 0) {
               count.forEach(function (item, index) {
                  var seatNumber = name + index;
                  connection.query(addSeat, [seatNumber, zoneID], function (err, result) {
                     if (err) {
                        throw err;
                     }
                     console.log("1 Seat  is inserted");
                  });
               });
            } else if (diff < 0) {
               var deleteSeat = "DELETE FROM seat WHERE Zone_ID = ? LIMIT ?;";
               connection.query(deleteSeat, [zoneID, Math.abs(diff)], function (err, result) {
                  if (err) {
                     throw err;
                  }
                  console.log( Math.abs(diff) + " Seat  is deleted");
               });
            }
         }
      });
   });
   res.redirect("/admin/concert-zone/select/" + concertName + "/" + concertShowtimeID);
});

router.get("/delete/:name/:id/:zone", function (req, res) {
   var concertShowtimeID = req.params.id;
   var concertName = req.params.name;
   var zoneID = req.params.zone;
   var sql = "DELETE FROM zone where zone_ID = ?;"
   connection.query(sql, [zoneID], function (err, result) {
      if (err) {
         throw err;
      }
      console.log("Delete!");
      res.redirect("/admin/concert-zone/select/" + concertName + "/" + concertShowtimeID);
   });
});

module.exports = router;