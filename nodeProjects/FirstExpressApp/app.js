var express = require("express");
var app = express();
var port = 3000;

var sounds = {
    dog: "woof",
    cow: "moo",
    pig: "oink"
}

// Home
app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment");
});

// Speak

app.get("/speak/:animal", function(req, res) {
    var animal = req.params.animal.toLowerCase;
    if (animal in sounds) {
        res.send(sounds[animal]);
    } else {
        res.send("Animal not in database!");
    }
});

app.get("/repeat/:what/:n", function(req, res) {
    var phrase = req.params.what;
    var n = parseInt(req.params.n, 10);
    var result = "";
    for (var i = 0; i < n; ++i) {
        result += phrase + " ";
    }
    res.send(result);
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found...");
})

app.listen(port, function() {
    console.log("Server is listening on port " + port);
});