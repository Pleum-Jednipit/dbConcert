var express = require("express");
var router = express.Router();
const connection = require("../../connection");
var middleware = require("../../middleware");
var dateFormat = require('dateformat');

//root route landing 
router.get("/", function (req, res) {
    var getpromotionInfo = "SELECT *  FROM promotion";
    connection.query(getVenueInfo, function (err, promotionInfo) {
       if (err) {
          throw err;
       }
       console.log(promotionInfo)
       res.render("./user/promotion/promotionindex", {promotion : promotionInfo});
    });
 });

 router.get("/:name", function (req, res) {
    var promotionName = req.params.name.split("-").join(" ");
    var getpromotionInfo = "SELECT *  FROM promotion WHERE promotion_Name = ?";
    connection.query(getpromotionInfo,[promotionName], function (err, promotionInfo) {
       if (err) {
          throw err;
       }
       console.log(promotionInfo[0])
       res.render("./user/promotion/promotionshow", {promotion : promotionInfo[0]});
    });
 });


module.exports = router;