var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

var dogs = [
    {
        name: "Fuzzy",
        breed: "Dalmatian"
    },
    {
        name: "Barky",
        breed: "Pitbull"
    }
]

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("home.ejs");
});

// a dynamic page
app.get("/fallinlovewith/:thing", function(req, res) {
    var thing = req.params.thing;
    res.render("love.ejs", {thingVar: thing});
});

app.get("/displaydogs", function(req, res) {
    res.render("dogs.ejs", {dogsVar: dogs})
});

app.post("/adddog", function(req, res) {
    var nameReq = req.body.name;
    var breedReq = req.body.breed;
    dogs.push({name: nameReq, breed: breedReq});
    res.redirect("/displaydogs");
});

app.listen(3000, function() {
    console.log("Server is listening on port 3000");
});