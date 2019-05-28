var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")
var middleware = require("../../middleware");
var {
   isAdmin
} = middleware;

// add ticket receiving
router.get("/new",isAdmin, function (req, res) {
    res.render("./admin/payment-index/ticket-receiving/new");
 });
 
 router.post("/new", isAdmin,function (req, res) {
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


 router.get("/edit",isAdmin, function (req, res) {
   res.render("./admin/payment-index/ticket-receiving/edit", {ticket : ""});
});

router.post("/edit", isAdmin,function (req, res) {
 var search    = req.body.ticketName;
 var sqlSearch = "SELECT * FROM ticket_receiving WHERE Ticket_Receiving_Name = ?;" ;
 connection.query(sqlSearch,[search], function (err, ticket) {
    if (err) {
       throw err;
    }
    console.log(ticket[0]);
    if(ticket[0]){
      res.render("./admin/payment-index/ticket-receiving/edit", { ticket: ticket[0]});
    }
    else{
      res.render("./admin/payment-index/ticket-receiving/edit", { ticket: "none"});
    }
});
});

router.put("/edit",isAdmin, function (req, res) {
 var ticketID = req.body.ticketID;
 var ticketName = req.body.name;
 var ticketDetail = req.body.detail;
 var ticketFee   = req.body.price;
 var sql = "UPDATE ticket_receiving SET ticket_receiving_Name = ?, ticket_receiving_Detail = ?, ticket_receiving_Fee = ? WHERE ticket_receiving_ID = ?;"
 connection.query(sql,[ticketName,ticketDetail,ticketFee,ticketID], function (err, concert) {
    if (err) {
       throw err;
    }
    console.log("Updated!")
    res.redirect("/admin/payment/index");
 });
});

router.get("/delete/:id",isAdmin, function (req, res) {
 var sql = "DELETE FROM ticket_receiving where ticket_receiving_ID = ?;"
 var ticketID = req.params.id
 connection.query(sql, [ticketID], function (err, result) {
    if (err) {
       throw err;
    }
    console.log("Delete!");
    res.redirect("/admin/payment/index");
 });
});
 
 


 module.exports = router;
