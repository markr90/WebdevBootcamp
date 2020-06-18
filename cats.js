const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app", {useNewUrlParser: true});

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema, "weirdcats");

Cat.create({
	name: "Snow white",
	age: 15,
	temparament: "Nice"
}, function(err, cat) {
	if (err) {
		console.log(err);
	} else {
		console.log("Succes");
		console.log(cat);
	}
});

Cat.find({}, function(err, cats) {
	if (err) {
		console.log("OH NO ERROR");
		console.log(err);
	} else {
		console.log("All the cats...");
		console.log(cats);
	}
});
