var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")


router.get("/new", function (req, res) {
    var getRecordLabel = "SELECT Record_Label_ID, Record_Label_Name FROM record_label;";
    connection.query(getRecordLabel, function (err, allRecordLabel) {
        if (err) {
           throw err;
        }
       res.render("./admin/concert-index/concert-artist/artist/new", {recordLabel: allRecordLabel});
    });
});

router.post("/new", function (req, res) {
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
       res.redirect("/admin/index");
    });
 });
 

 module.exports = router;