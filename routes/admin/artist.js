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
    var artistName = req.body.name;
    var artistDetail = req.body.detail;
    var recordLabel = req.body.recordLabel;
    connection.query(sql, [artistName,artistDetail,recordLabel], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 Artist is inserted");
       res.redirect("/admin/concert-artist/index");
    });
 });
  
 router.get("/edit", function (req, res) {
      res.render("./admin/concert-index/concert-artist/artist/edit", {artist : ""});
 });

 router.post("/edit", function (req, res) {
    var search    = req.body.search;
    var sqlSearch = "SELECT * FROM artist WHERE artist_Name = ?;" ;
   connection.query(sqlSearch,[search], function (err, artist) {
      if (err) {
         throw err;
      }
       if(artist[0]){
         var getCurrentRecordLabel = "SELECT Record_Label_Name FROM record_label WHERE record_label_ID = ?";
         connection.query(getCurrentRecordLabel,[artist[0].Record_Label_ID], function (err, currentRecordLabel) {
          if (err) {
             throw err;
          }
          var getRecordLabel = "SELECT  Record_Label_ID, Record_Label_Name FROM record_label;";
            connection.query(getRecordLabel, function (err, allRecordLabel) {
               if (err) {
                  throw err;
               }
               res.render("./admin/concert-index/concert-artist/artist/edit", { artist: artist[0], recordLabel: allRecordLabel, currentRecordLabel: currentRecordLabel[0]});
            });
         });
       }
         else{
         res.render("./admin/concert-index/concert-artist/artist/edit", { artist: "none"});
       }
   });
 });
 
 router.put("/edit", function (req, res) {
    var artistID = req.body.artistID;
    var artistName = req.body.name;
    var artistDetail = req.body.detail;
    var recordLabelName = req.body.recordLabel;
    var sql = "UPDATE artist SET artist_Name = ?, artist_Detail = ?, record_label_ID = ? WHERE artist_ID = ?;"
    connection.query(sql,[artistName,artistDetail,recordLabelName,artistID], function (err, concert) {
       if (err) {
          throw err;
       }
       console.log("Updated!")
       res.redirect("/admin/concert-artist/index");
    });
 });
 
 router.get("/delete/:id", function (req, res) {
    var sql = "DELETE FROM artist where artist_ID = ?;"
    var artistID = req.params.id
    connection.query(sql, [artistID], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("Delete!");
       res.redirect("/admin/concert-artist/index");
    });
 });
 

 module.exports = router;