var express = require("express");
var router = express.Router();
var passport = require("passport");
const connection = require("../../connection")

//root route
router.get("/index", function (req, res) {
   res.render("./admin/index");
});

router.get("/concert/index", function (req, res) {
   res.render("./admin/concert-index/index");
});

router.get("/concert-artist/index", function (req, res) {
   res.render("./admin/concert-index/concert-artist/index");
});

router.get("/promotion/index", function (req, res) {
   res.render("./admin/promotion-index/index");
});

router.get("/payment/index", function (req, res) {
   res.render("./admin/payment-index/index");
});

module.exports = router;