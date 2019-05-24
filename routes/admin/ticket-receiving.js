var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")

// add ticket receiving
router.get("/new", function (req, res) {
    res.render("./admin/payment-index/ticket-receiving/new");
 });
 
 router.post("/new", function (req, res) {
    var sql = "INSERT INTO ticket_receiving ( Ticket_Receiving_Name ,Ticket_Receiving_Detail, Ticket_Receiving_Fee) " +
       "VALUES (?,?,?)";
    var name = req.body.name;
    var detail = req.body.detail;
    var price = req.body.price
    connection.query(sql, [name, detail, price], function (err, result) {
       if (err) {
          throw err;
       }
       console.log("1 Ticket Receiving Record is inserted");
       res.redirect("/admin/index");
    });
 });
 
 


 module.exports = router;
