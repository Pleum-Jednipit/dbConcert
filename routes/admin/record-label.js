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
    var recordLabelName = req.body.name;
    var recordLabelAddress = req.body.address;
    var recordLabelEmail = req.body.email;
    var recordLabelPhoneNumber = req.body.phone;
    var recordLabelWebsite = req.body.website;
    connection.query(sql, [recordLabelName,recordLabelAddress,recordLabelEmail,recordLabelPhoneNumber,recordLabelWebsite], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 Record Label is inserted");
       res.redirect("/admin/concert-artist/index");
    });
 });

 router.get("/edit", function (req, res) {
      res.render("./admin/concert-index/concert-artist/record-label/edit", {recordLabel : ""});
 });

 router.post("/edit", function (req, res) {
    var search    = req.body.search;
    var sqlSearch = "SELECT * FROM record_label WHERE record_label_Name = ?;" ;
    connection.query(sqlSearch,[search], function (err, recordLabel) {
       if (err) {
          throw err;
       }
       if(recordLabel[0]){
         res.render("./admin/concert-index/concert-artist/record-label/edit", { recordLabel: recordLabel[0]});
       }
       else{
         res.render("./admin/concert-index/concert-artist/record-label/edit", { recordLabel: "none"});
       }
   });
 });
 
 router.put("/edit", function (req, res) {
    var recordLabelID = req.body.recordLabelID;
    var recordLabelName = req.body.name;
    var recordLabelAddress = req.body.address;
    var recordLabelEmail = req.body.email;
    var recordLabelPhoneNumber = req.body.phone;
    var recordLabelWebsite = req.body.website;
    var sql = "UPDATE record_label SET record_label_Name = ?, record_label_Address = ?, record_label_EmailAddress = ? , record_label_PhoneNumber = ? , record_label_Website = ? WHERE record_label_ID = ?;"
    connection.query(sql,[recordLabelName,recordLabelAddress,recordLabelEmail,recordLabelPhoneNumber,recordLabelWebsite,recordLabelID], function (err, concert) {
       if (err) {
          throw err;
       }
       console.log("Updated!")
       res.redirect("/admin/concert-artist/index");
    });
 });
 
 router.get("/delete/:id", function (req, res) {
    var sql = "DELETE FROM record_label where record_label_ID = ?;"
    var recordLabelID = req.params.id
    connection.query(sql, [recordLabelID], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("Delete!");
       res.redirect("/admin/concert-artist/index");
    });
 });



 module.exports = router;



