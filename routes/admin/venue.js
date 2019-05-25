var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")

// add new venue
router.get("/new", function (req, res) {
    res.render("./admin/venue/new");
 });

router.post("/new", function (req, res) {
    var sql = "INSERT INTO venue ( Venue_Name, Venue_Address , Venue_EmailAddress , Venue_PhoneNumber,Venue_SeatingCapacity) " +
       "VALUES (?,?,?,?,?)";
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;
    var phoneNumber = req.body.phone;
    var seatingCapacity = req.body.capacity;
    connection.query(sql, [name, address, email, phoneNumber, seatingCapacity], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 Venue Record is inserted");
       res.redirect("/admin/index");
    });
 });

 router.get("/edit", function (req, res) {
   res.render("./admin/venue/edit", {venue : ""});
});

router.post("/edit", function (req, res) {
 var search    = req.body.search;
 var sqlSearch = "SELECT * FROM venue WHERE venue_Name = ?;" ;
 connection.query(sqlSearch,[search], function (err, venue) {
    if (err) {
       throw err;
    }
    console.log(venue[0]);
    if(venue[0]){
      res.render("./admin/venue/edit", { venue: venue[0]});
    }
    else{
      res.render("./admin/venue/edit", { venue: "none"});
    }
});
});

router.put("/edit", function (req, res) {
 var venueID = req.body.venueID;
 var venueName = req.body.name;
 var email = req.body.email;
 var address = req.body.address;
 var phoneNumber = req.body.phone;
 var seatingCapacity = req.body.capacity;
 var sql = "UPDATE venue SET venue_Name = ?, venue_Address = ?, venue_EmailAddress = ?, venue_PhoneNumber = ?, venue_SeatingCapacity = ? WHERE venue_ID = ?;"
 connection.query(sql,[venueName,address,email,phoneNumber,seatingCapacity,venueID], function (err, concert) {
    if (err) {
       throw err;
    }
    console.log("Updated!")
    res.redirect("/admin/index");
 });
});

router.get("/delete/:id", function (req, res) {
 var sql = "DELETE FROM venue where venue_ID = ?;"
 var venueID = req.params.id
 connection.query(sql, [venueID], function (err, result) {
    if (err) {
       throw err;
    }
    console.log("Delete!");
    res.redirect("/admin/index");
 });
});
 


 module.exports = router;