var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require("passport");
var session = require('express-session');
var flash        = require("connect-flash");
const connection                = require("./connection")
var userRoutes                  = require("./routes/user"),
    concertRoutes               = require("./routes/user/concert"),
    venueRoutes                 = require("./routes/user/venue"),
    artistRoutes                = require("./routes/user/artist"),
    promotionRoutes             = require("./routes/user/promotion"),
    adminRoutes                 = require("./routes/admin/index"),
    adminconcertRoutes          = require("./routes/admin/concert"),
    adminartistRoutes           = require("./routes/admin/artist"),
    adminvenueRoutes            = require("./routes/admin/venue"),
    adminrecordLabelRoutes      = require("./routes/admin/record-label"),
    adminpaymentMethodRoutes    = require("./routes/admin/payment"),
    adminticketReceivingRoutes  = require("./routes/admin/ticket-receiving"),
    adminpromotionRoutes        = require("./routes/admin/promotion"),
    adminconcertShowtimeRoutes  = require("./routes/admin/concert-showtime"),
    adminconcertArtistRoutes    = require("./routes/admin/concert-artist"),
    adminconcertZoneRoutes      = require("./routes/admin/concert-zone"),
    adminpromotionMemberRoutes  = require("./routes/admin/promotion-member"),
    adminmemberTypeRoutes       = require("./routes/admin/member-type");

connection.connect(function(err){
   if(err){
      console.log("Fail to connect to database");
      throw err;
   }else{
      console.log("Successfully connect to database")
   }
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.static("JS"));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));

app.use(function(req,res,next){
   res.locals.isLogin = req.session.isLogin;
   res.locals.currentUser = req.session.username;
   res.locals.isAdmin = req.session.isAdmin;
   res.locals.currentPage = req.session.currentPage;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
})




app.use(methodOverride('_method'));
app.use("/", userRoutes);
app.use("/concert", concertRoutes);
app.use("/artist", artistRoutes);
app.use("/venue", venueRoutes);
app.use("/promotion", promotionRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/concert",adminconcertRoutes);
app.use("/admin/artist",adminartistRoutes);
app.use("/admin/venue",adminvenueRoutes);
app.use("/admin/record-label",adminrecordLabelRoutes);
app.use("/admin/payment-method",adminpaymentMethodRoutes);
app.use("/admin/ticket-receiving",adminticketReceivingRoutes);
app.use("/admin/promotion",adminpromotionRoutes);
app.use("/admin/member-type",adminmemberTypeRoutes);
app.use("/admin/concert-showtime",adminconcertShowtimeRoutes);
app.use("/admin/concert-artist",adminconcertArtistRoutes);
app.use("/admin/concert-zone",adminconcertZoneRoutes);
app.use("/admin/promotion-member",adminpromotionMemberRoutes);


app.listen(3000, function(){
   console.log("The Concert Server Has Started!!!"); 
});