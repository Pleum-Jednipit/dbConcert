var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")

// add payment method 
router.get("/new", function (req, res) {
    res.render("./admin/payment-index/payment/new");
 });
 
 router.post("/new", function (req, res) {
    var sql = "INSERT INTO payment_method ( Payment_Method_Name ,Payment_Method_Description) " +
       "VALUES (?,?)";
    var name = req.body.name;
    var detail = req.body.detail;
    connection.query(sql, [name, detail], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 Payment Method Record is inserted");
       res.redirect("/admin/index");
    });
 });


 router.get("/edit", function (req, res) {
   console.log("ISUS");
   res.render("./admin/concert-index/concert/edit", {concert : ""});
});

router.post("/edit", function (req, res) {
 var concertSearch = req.body.concertSearch;
 var searchConcert = "SELECT * FROM concert WHERE concert_Name = ?" ;
 connection.query(searchConcert,[concertSearch], function (err, concert) {
    if (err) {
       throw err;
    }
    if(concert){
      var getCurrentVenue = "SELECT Venue_Name FROM venue WHERE Venue_ID = ?";
      connection.query(getCurrentVenue,[concert[0].Venue_ID], function (err, currentVenue) {
       if (err) {
          throw err;
       }
       console.log(concert[0]);
       console.log(currentVenue);
         // var getVenue = "SELECT Venue_ID,Venue_Name FROM venue;";
         // connection.query(getVenue, function (err, allVenue) {
         //    if (err) {
         //       throw err;
         //    }
         //    console.log(allVenue);
      res.render("./admin/concert-index/concert/edit", { concert: concert[0],  currentVenue: currentVenue[0]});
         // });
      });
    }
});
//          , {
//              concert: concert[0], venue: allVenue, currentVenue: currentVenue[0]
//              });
//          });
//     });
//  });
});

router.put("/edit", function (req, res) {
 var concertID = req.body.concertID;
 var name = req.body.name;
 var date = req.body.saleDate;
 var time = req.body.saleTime;
 var detail = req.body.detail;
 var poster = req.body.poster;
 var venue = req.body.venue;
 var sql = "UPDATE concert SET concert_Name = ?, concert_Sales_Date = ?,concert_Sales_Time = ?, Concert_Detail = ?, Concert_Poster = ?, Venue_ID = ? WHERE concert_ID = ?;"
 connection.query(sql,[name,date,time,detail,poster,venue,concertID], function (err, concert) {
    if (err) {
       throw err;
    }
    console.log("Updated!")
    res.redirect("/admin/index");
 });
});

router.post("/delete", function (req, res) {
 var sql = "DELETE FROM concert where payment = ?;"
 var concertID = req.params.id;
 connection.query(sql, [concertID], function (err, result) {
    if (err) {
       throw err;
    }
    console.log("Delete!");
    res.redirect("/admin/concert/index");
 });
});
 
 
 


 module.exports = router;