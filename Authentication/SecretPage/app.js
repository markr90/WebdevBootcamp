const express               = require("express");
const mongoose              = require("mongoose");
const passport              = require("passport");
const bodyParser            = require("body-parser");
const localStrategy         = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User                  = require("./models/user");
const expressSession        = require("express-session");

mongoose.connect("mongodb://localhost:27017/secret_app", {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.set("view engine", "ejs");
app.use(expressSession({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false,
    cookie: {_expires: 60000}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===================================
// ROUTES
// ===================================

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res) {
    res.render("secret");
});

// AUTH ROUTES

// show register page
app.get("/register", function(req, res) {
    res.render("register");
});
// handle user signup
app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});
// show login page
app.get("/login", function(req, res) {
    res.render("login");
});
// handle login
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res) {
});
// handle logout
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}


app.listen(3000, function() {
    console.log("Server is listening on port 3000");
});