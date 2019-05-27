var express = require("express");
var router = express.Router();
const connection = require("../../connection");
var middleware = require("../../middleware");
var { isUser } = middleware;


//root route landing 
router.get("/",function (req, res) {
   console.log("saf");
   res.render("./user/concert/concert");
});





module.exports = router;