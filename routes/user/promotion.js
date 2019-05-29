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
       promotionInfo.forEach(function(item){
         item.Promotion_Start = dateFormat(item.Promotion_Start,"mediumDate");
         item.Promotion_End = dateFormat(item.Promotion_End,"mediumDate");
       });
       res.render("./user/promotion/promotionindex", {promotion : promotionInfo});
    });
 });

 router.get("/:name", function (req, res) {
    var promotionName = req.params.name.split("-").join(" ");
    var getpromotionInfo = "SELECT *  FROM promotion p, membertype mt, member_promotion mp, concert c WHERE p.Promotion_ID = mp.Promotion_ID AND mp.MemberType_ID = mt.MemberType_ID AND p.Concert_ID = c.Concert_ID AND p.Promotion_Name = ? GROUP BY p.Promotion_ID ";
    connection.query(getpromotionInfo,[promotionName], function (err, promotionInfo) {
       if (err) {
          throw err;
       }
       console.log("ho");
       console.log(promotionInfo[0])
       promotionInfo.forEach(function(item){
         item.Promotion_Start = dateFormat(item.Promotion_Start,"mediumDate");
         item.Promotion_End = dateFormat(item.Promotion_End,"mediumDate");
       });
       res.render("./user/promotion/promotionshow", {promotion : promotionInfo[0]});
    });
 });


module.exports = router;