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
    var phoneNumber = req.body.phoneNumber;
    var seatingCapacity = req.body.seatingCapacity;
    connection.query(sql, [name, address, email, phoneNumber, seatingCapacity], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 Venue Record is inserted");
       res.redirect("/admin/index");
    });
 });
 


 module.exports = router;