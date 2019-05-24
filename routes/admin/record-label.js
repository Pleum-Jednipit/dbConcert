var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")


// add record label
router.get("/new", function (req, res) {
    res.render("./admin/concert-index/concert-artist/record-label/new");
 });
 
 router.post("/new", function (req, res) {
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
       res.redirect("/admin/index");
    });
 });



 module.exports = router;



