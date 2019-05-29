var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection");
var async = require('async');
var middleware = require("../../middleware");
var {
   isAdmin
} = middleware;


router.get("/new", isAdmin, function (req, res) {
   var sql = "SELECT * FROM concert;";
   connection.query(sql, function (err, result) {
      if (err) {
         throw err;
      }
      res.render("./admin/concert-index/concert-artist/management/new", {
         concert: "",
         search: result
      });
   });
});

router.post("/new", isAdmin, function (req, res) {
   var search = req.body.search;
   var sqlSearch = "SELECT Concert_ID, Concert_Name FROM concert WHERE Concert_Name = ?;";
   connection.query(sqlSearch, [search], function (err, concert) {
      if (err) {
         throw err;
      }
      var getAllArtist = "SELECT Artist_Name, Artist_ID FROM artist";
      connection.query(getAllArtist, function (err, artist) {
         if (err) {
            throw err;
         }
         var sql = "SELECT * FROM concert;";
         connection.query(sql, function (err, result) {
            if (err) {
               throw err;
            }
            res.render("./admin/concert-index/concert-artist/management/new", {
               concert: concert[0],
               artist: artist,
               search: result
            });
         });
      });
   });
});


router.post("/new/insert", isAdmin, function (req, res) {
   var concertID = req.body.concertID;
   var newArtist = req.body.dropdown;
   var sql = "INSERT INTO concert_artist (concert_id, artist_id) " +
      "VALUES (?,?)";
   if (Array.isArray(newArtist)) {
      newArtist.forEach(function (item) {
         connection.query(sql, [concertID, item], function (err, result) {
            if (err) {
               throw err;
            }
            console.log("1 Concert Artist is inserted");
         });
      });
   } else {
      connection.query(sql, [concertID, newArtist], function (err, result) {
         if (err) {
            throw err;
         }
         console.log("1 Concert Artist is inserted");
      });

   }
   res.redirect("/admin/concert-artist/index");
});

router.get("/edit", isAdmin, function (req, res) {
   var sql = "SELECT * FROM concert;";
   connection.query(sql, function (err, result) {
      if (err) {
         throw err;
      }
      res.render("./admin/concert-index/concert-artist/management/edit", {
         concertArtist: "",
         search: result
      });
   });
});

router.post("/edit", isAdmin, function (req, res) {
   var allArtist = [];
   var search = req.body.search;
   var sqlSearch = "SELECT * FROM concert_artist ca, concert c ,artist a WHERE ca.Concert_ID = c.Concert_ID AND c.Concert_Name = ? AND ca.Artist_ID = a.Artist_ID;";
   connection.query(sqlSearch, [search], function (err, allConcertArtist) {
      if (err) {
         throw err;
      }
      if (allConcertArtist[0]) {
            var getAllArtist = "SELECT Artist_Name, Artist_ID FROM artist";
            connection.query(getAllArtist, function (err, artist) {
               if (err) {
                  throw err;
               }
               var sql = "SELECT * FROM concert;";
               connection.query(sql, function (err, result) {
                  if (err) {
                     throw err;
                  }
                  res.render("./admin/concert-index/concert-artist/management/edit", {
                     concertID: allConcertArtist[0].Concert_ID,
                     concertArtist: allConcertArtist,
                     concertName: search,
                     artist: artist,
                     search: result
                  });
               });
            });
      } else {
         var sql = "SELECT * FROM concert;";
         connection.query(sql, function (err, result) {
            if (err) {
               throw err;
            }
            res.render("./admin/concert-index/concert-artist/management/edit", {
               concertArtist: "none",
               search: result
            });
         });
      }
   });
});

router.put("/edit", isAdmin, function (req, res) {
   var deleteID = req.body.delete;
   console.log("Hi" + deleteID);
   var update = req.body.dropdown;
   var concertArtistID = req.body.concertArtistID;
   console.log(update);
   console.log("CHECK" + concertArtistID);
      if (deleteID !== undefined) {
         console.log(hello);
         var sql = "DELETE FROM concert_artist where Concert_Artist_ID = ?;";
         var count = Array(deleteID).fill(1);
         count.forEach(function (item) {
            connection.query(sql, [item], function (err, result) {
               if (err) {
                  throw err;
               }
               console.log("Delete!");
            });
         });
   } else {
      console.log("HERE @ !@")
      var sql = "UPDATE concert_artist SET Artist_ID = ? WHERE Concert_Artist_ID = ? ;"
      console.log(Array.isArray(concertArtistID));
      if (Array.isArray(concertArtistID)) {
         concertArtistID.forEach(function (item, index) {
            console.log("HERE" + update[index] + item);
            connection.query(sql, [update[index], item], function (err, result) {
               if (err) {
                  throw err;
               }
               console.log("1 Concert Artist is Updates");
            });
         });
      } else {
         connection.query(sql, [update, concertArtistID], function (err, result) {
            if (err) {
               throw err;
            }
            console.log("1 Concert Artist is Updates");
         });
      }
   }
   res.redirect("/admin/concert-artist/index");
});

router.get("/delete/:id", isAdmin, function (req, res) {
   var sql = "DELETE FROM concert_artist where Concert_Artist_ID = ?;"
   var Concert_Artist_ID = req.params.id
   console.log(concertID);
   connection.query(sql, [concertID], function (err, result) {
      if (err) {
         throw err;
      }
      console.log("Delete!");
      res.redirect("/admin/concert-index/concert-artist/index");
   });
});


module.exports = router;