var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection");
var middleware = require("../../middleware");
var {
   isAdmin
} = middleware;


router.get("/new", isAdmin, function (req, res) {
   res.render("./admin/payment-index/payment/new");
});

router.post("/new", isAdmin, function (req, res) {
   var sql = "INSERT INTO payment ( payment_Name, payment_Detail, payment_Fee) " +
      "VALUES (?,?,?)";
   var paymentName = req.body.name;
   var paymentDetail = req.body.detail;
   var paymentFee = req.body.price;
   connection.query(sql, [paymentName, paymentDetail, paymentFee], function (err, result) {
      if (err) {
         throw err;
      }
      console.log("1 Payment is inserted");
      res.redirect("/admin/payment/index");
   });
});

router.get("/edit", isAdmin, function (req, res) {
   var sql = "SELECT * FROM payment;";
   connection.query(sql, function (err, result) {
      if (err) {
         throw err;
      }
      res.render("./admin/payment-index/payment/edit", {
         payment: "",
         search: result
      });
   });
});

router.post("/edit", isAdmin, function (req, res) {
   var search = req.body.dropdown;
   console.log("FUCK" + search);
   var sqlSearch = "SELECT * FROM payment WHERE Payment_Name = ?;";
   connection.query(sqlSearch, [search], function (err, payment) {
      if (err) {
         throw err;
      }
      console.log(search);
      console.log(payment[0]);
      if (payment[0]) {
         var sql = "SELECT * FROM payment;";
         connection.query(sql, function (err, result) {
            if (err) {
               throw err;
            }
            res.render("./admin/payment-index/payment/edit", {
               payment: payment[0],
               search: result
            });
         });

      } else {
         res.render("./admin/payment-index/payment/edit", {
            payment: "none"
         });
      }
   });
});

router.put("/edit", isAdmin, function (req, res) {
   console.log("check");
   var paymentID = req.body.paymentID;
   var paymentName = req.body.name;
   var paymentDetail = req.body.detail;
   var paymentFee = req.body.price;
   var sql = "UPDATE payment SET payment_Name = ?, payment_Detail = ?,payment_Fee = ? WHERE payment_ID = ?;"
   connection.query(sql, [paymentName, paymentDetail, paymentFee, paymentID], function (err, concert) {
      if (err) {
         throw err;
      }
      console.log("Updated!")
      res.redirect("/admin/payment/index");
   });
});

router.get("/delete/:id", isAdmin, function (req, res) {
   var sql = "DELETE FROM payment where payment_ID = ?;"
   var paymentID = req.params.id
   connection.query(sql, [paymentID], function (err, result) {
      if (err) {
         throw err;
      }
      console.log("Delete!");
      res.redirect("/admin/payment/index");
   });
});


module.exports = router;