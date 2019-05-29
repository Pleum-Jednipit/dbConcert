var express = require("express");
var router = express.Router();
const connection = require("../../connection");
var middleware = require("../../middleware");
var dateFormat = require('dateformat');

//root route landing 
router.get("/", function (req, res) {
    var getpromotionInfo = "SELECT *  FROM promotion p, membertype mt, member_promotion mp, concert c WHERE p.Promotion_ID = mp.Promotion_ID AND mp.MemberType_ID = mt.MemberType_ID AND p.Concert_ID = c.Concert_ID GROUP BY p.Promotion_ID";
    connection.query(getpromotionInfo, function (err, promotionInfo) {
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