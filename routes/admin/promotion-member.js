var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection");
var async = require('async');
var middleware = require("../../middleware");
var {
   isAdmin
} = middleware;


router.get("/new", isAdmin,function (req, res) {
   var sql = "SELECT * FROM promotion;";
   connection.query(sql, function (err, all) {
      if (err) {
         throw err;
      }
      res.render("./admin/promotion-index/promotion-member/new", {
         promotion: "",
         search: all
      });
   });
});

router.post("/new", isAdmin,function (req, res) {
   console.log("hi")
   var search = req.body.dropdown;
   var sqlSearch = "SELECT * FROM promotion WHERE Promotion_Name = ?;";
   connection.query(sqlSearch, [search], function (err, promotion) {
      if (err) {
         throw err;
      }
      var getAllMember = "SELECT * FROM membertype";
      connection.query(getAllMember, function (err, membertype) {
         if (err) {
            throw err;
         }
         var sql = "SELECT * FROM promotion;";
         connection.query(sql, function (err, all) {
            if (err) {
               throw err;
            }
            res.render("./admin/promotion-index/promotion-member/new", {
               promotion: promotion[0],
               membertype: membertype,
               search : all
            });
         });
      });
   });
});


router.post("/new/insert", function (req, res) {
   var promotionID = req.body.promotionID;
   var membertype = req.body.dropdown;
   var sql = "INSERT INTO member_promotion (Promotion_ID, MemberType_ID) " +
      "VALUES (?,?)";
   if (Array.isArray(membertype)) {
      membertype.forEach(function (item) {
         connection.query(sql, [promotionID, item], function (err, result) {
            if (err) {
               throw err;
            }
            console.log("1 Member Type is inserted");
         });
      });
   } else {
      connection.query(sql, [promotionID, membertype], function (err, result) {
         if (err) {
            throw err;
         }
         console.log("1 Member Type is inserted");
      });

   }
   res.redirect("/admin/promotion/index");
});

//  router.get("/edit", function (req, res) {
//       res.render("./admin/concert-index/concert-artist/management/edit", {concertArtist : ""});
//  });

//  router.post("/edit", function (req, res) {
//     var allArtist = [];
//     var search    = req.body.search;
//     var sqlSearch = "SELECT ca.* FROM concert_artist ca, concert c WHERE ca.Concert_ID = c.Concert_ID AND c.Concert_Name = ?;" ;
//     connection.query(sqlSearch,[search], function (err, allConcertArtist) {
//        if (err) {
//           throw err;
//        }
//        if(allConcertArtist[0]){ 
//          async.forEachOf(allConcertArtist, function (concertArtist,none,callback) {
//             var getArtist = "SELECT Artist_ID, Artist_Name FROM artist WHERE Artist_ID = ?";
//             connection.query(getArtist,[concertArtist.Artist_ID], function (err, artist) {
//                if (err) {
//                   throw err;
//                }
//                var data = {
//                   Concert_Artist_ID: concertArtist.Artist_ID,
//                   Artist_ID: artist[0].Artist_ID,
//                   Artist_Name: artist[0].Artist_Name
//                };
//                allArtist.push(data);
//                callback(null);
//             });
//          }, function done() {
//             console.log(allArtist);
//             allArtist.forEach(function (item) {
//                console.log(item.Artist_Name);
//             });
//             var getAllArtist = "SELECT Artist_Name, Artist_ID FROM artist";
//             connection.query(getAllArtist, function (err, artist) {
//                if (err) {
//                   throw err;
//                }
//                res.render("./admin/concert-index/concert-artist/management/edit", { concertID: allConcertArtist[0].Concert_ID , concertArtist : allArtist, concertName : search, artist : artist});
//             });
//          });
//       }
//        else{
//          res.render("./admin/concert-index/concert-artist/management/edit", { concertArtist: "none"});
//        }
//    });
//  });

//  router.put("/edit", function (req, res) {
//     var deleteID = req.body.delete;
//     console.log("Hi" + deleteID);
//     var update    = req.body.dropdown;
//     var concertArtistID = req.body.concertArtistID;
//     console.log(update);
//     if(concertArtistID === undefined){
//        if(deleteID !== undefined){
//          var sql = "DELETE FROM concert_artist where Concert_Artist_ID = ?;";
//          var count = Array(deleteID).fill(1);
//          count.forEach(function(item){
//             connection.query(sql, [item], function (err, result) {
//                if (err) {
//                   throw err;
//                }
//                console.log("Delete!");
//             });
//          });
//        }
//     } else {
//       var sql = "UPDATE concert_artist SET Artist_ID = ? WHERE Concert_Artist_ID = ? ;"
//       console.log(Array.isArray(concertArtistID));
//       if(Array.isArray(concertArtistID)){
//         concertArtistID.forEach(function(item,index){
//            connection.query(sql, [update[index],item], function (err, result) {
//                  if (err) {
//                     throw err;
//                  }
//                  console.log("1 Concert Artist is Updates");
//               });
//          });
//       }
//       else{
//            connection.query(sql, [update,concertArtistID], function (err, result) {
//                  if (err) {
//                     throw err;
//                  }
//                  console.log("1 Concert Artist is Updates");
//               });
//       }
//     }
//     res.redirect("/admin/concert-artist/index");
//  });

//  router.get("/delete/:id", function (req, res) {
//     var sql = "DELETE FROM concert_artist where Concert_Artist_ID = ?;"
//     var Concert_Artist_ID = req.params.id
//     console.log(concertID);
//     connection.query(sql, [concertID], function (err, result) {
//        if (err) {
//           throw err;
//        }
//        console.log("Delete!");
//        res.redirect("/admin/concert-index/concert-artist/index");
//     });
//  });


module.exports = router;