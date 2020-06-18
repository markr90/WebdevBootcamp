const port           = 3000;
const express        = require("express");
const app            = express();
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const passport       = require("passport");
const localStrategy  = require("passport-local");
const methodOverride = require("method-override")
const seedDB         = require("./seeds");

// Routes
var campgroundRoutes    = require("./routes/campgrounds");
var commentRoutes       = require("./routes/comments");
var authRoutes          = require("./routes/auth")


seedDB(); // Seed the database

// App setup
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// Database connections
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true , useUnifiedTopology: true});
var User = require("./models/user");

// Passport configuration
app.use(require("express-session")({
    secret: "Rusty is a cute dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// Landing page

app.get("/", function(req, res) {
    res.render("landing");
});

app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(port, function() {
    console.log("Server is listening on port " + port);
});