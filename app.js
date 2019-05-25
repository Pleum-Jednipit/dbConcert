var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mysql = require("mysql");
const connection           = require("./connection")
var indexRoutes            = require("./routes/index"),
    adminRoutes            = require("./routes/admin/index"),
    concertRoutes          = require("./routes/admin/concert"),
    artistRoutes           = require("./routes/admin/artist");
    venueRoutes            = require("./routes/admin/venue"),
    recordLabelRoutes      = require("./routes/admin/record-label"),
    paymentMethodRoutes    = require("./routes/admin/payment"),
    ticketReceivingRoutes  = require("./routes/admin/ticket-receiving"),
    promotionRoutes        = require("./routes/admin/promotion"),
    concertShowtimeRoutes  = require("./routes/admin/concert-showtime"),
    concertArtistRoutes    = require("./routes/admin/concert-artist"),
    concertZoneRoutes      = require("./routes/admin/concert-zone"),
    memberTypeRoutes       = require("./routes/admin/member-type");

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

app.use(methodOverride('_method'));
app.use("/", indexRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/concert",concertRoutes);
app.use("/admin/artist",artistRoutes);
app.use("/admin/venue",venueRoutes);
app.use("/admin/record-label",recordLabelRoutes);
app.use("/admin/payment-method",paymentMethodRoutes);
app.use("/admin/ticket-receiving",ticketReceivingRoutes);
app.use("/admin/promotion",promotionRoutes);
app.use("/admin/member-type",memberTypeRoutes);
app.use("/admin/concert-showtime",concertShowtimeRoutes);
app.use("/admin/concert-artist",concertArtistRoutes);
app.use("/admin/concert-zone",concertZoneRoutes);


app.listen(3000, function(){
   console.log("The Concert Server Has Started!!!"); 
});