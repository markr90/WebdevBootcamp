var Campground  = require("./models/campground");
var Comment     = require("./models/comment");
const passport  = require("passport");
var User        = require("./models/user");


var users = [
    {
        username: "admin",
        password: "password"
    },
    {
        username: "jimmy",
        password: "jimmy"
    }
];

var data = [
    {
        name: "Granite Hill", 
        image: "https://www.threeriversparks.org/sites/default/files/2019-03/Baker%20campground.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet mattis tortor, sed varius magna tristique luctus. Nulla tellus lorem, gravida ornare faucibus quis, molestie nec massa. Phasellus quis libero vel dui imperdiet tempor vel quis elit. Nullam at enim risus. Aliquam dapibus dolor vitae eleifend consequat. Ut rhoncus ultrices neque, porttitor ullamcorper enim vehicula at. Donec fringilla quam fermentum sapien fringilla auctor. Integer gravida risus quis erat iaculis, vel luctus felis tincidunt. Proin tristique semper libero ac accumsan. Curabitur ut feugiat tellus. Etiam fringilla, ex a finibus sollicitudin, eros mi commodo odio, cursus tristique risus urna vel sem. Vestibulum quis nulla lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },
    {
        name: "Creekview", 
        image: "https://www.nps.gov/grca/planyourvisit/images/NRcg_0030.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet mattis tortor, sed varius magna tristique luctus. Nulla tellus lorem, gravida ornare faucibus quis, molestie nec massa. Phasellus quis libero vel dui imperdiet tempor vel quis elit. Nullam at enim risus. Aliquam dapibus dolor vitae eleifend consequat. Ut rhoncus ultrices neque, porttitor ullamcorper enim vehicula at. Donec fringilla quam fermentum sapien fringilla auctor. Integer gravida risus quis erat iaculis, vel luctus felis tincidunt. Proin tristique semper libero ac accumsan. Curabitur ut feugiat tellus. Etiam fringilla, ex a finibus sollicitudin, eros mi commodo odio, cursus tristique risus urna vel sem. Vestibulum quis nulla lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },
    {
        name: "Salmon Creek", 
        image: "https://www.yosemite.com/wp-content/uploads/2016/04/westlake-campground.png", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet mattis tortor, sed varius magna tristique luctus. Nulla tellus lorem, gravida ornare faucibus quis, molestie nec massa. Phasellus quis libero vel dui imperdiet tempor vel quis elit. Nullam at enim risus. Aliquam dapibus dolor vitae eleifend consequat. Ut rhoncus ultrices neque, porttitor ullamcorper enim vehicula at. Donec fringilla quam fermentum sapien fringilla auctor. Integer gravida risus quis erat iaculis, vel luctus felis tincidunt. Proin tristique semper libero ac accumsan. Curabitur ut feugiat tellus. Etiam fringilla, ex a finibus sollicitudin, eros mi commodo odio, cursus tristique risus urna vel sem. Vestibulum quis nulla lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },
    {
        name: "Beartooth Gulch", 
        image: "https://media-cdn.tripadvisor.com/media/photo-s/01/d9/bc/da/cougar-rock-campground.jpg", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet mattis tortor, sed varius magna tristique luctus. Nulla tellus lorem, gravida ornare faucibus quis, molestie nec massa. Phasellus quis libero vel dui imperdiet tempor vel quis elit. Nullam at enim risus. Aliquam dapibus dolor vitae eleifend consequat. Ut rhoncus ultrices neque, porttitor ullamcorper enim vehicula at. Donec fringilla quam fermentum sapien fringilla auctor. Integer gravida risus quis erat iaculis, vel luctus felis tincidunt. Proin tristique semper libero ac accumsan. Curabitur ut feugiat tellus. Etiam fringilla, ex a finibus sollicitudin, eros mi commodo odio, cursus tristique risus urna vel sem. Vestibulum quis nulla lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    }
];

function initUsers() {
    deleteAll(User, function() {
        users.forEach(function(entry) {
            var newUser = new User({username: entry.username});
            User.register(newUser, entry.password, function(err, user){
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added user: " + entry.username);
                }
            });
        });
    });
}


function initCampgrounds() {
    deleteAll(Campground, function() {
        data.forEach(function(entry) {
            Campground.create(entry, function(err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added a campground");
                    //addDefaultComment(campground);
                }
            });
        });
    });
}

function addDefaultComment(campground) {    
    Comment.create({
        author: "Homer",
        text: "This place is great, but I wish there was internet."
    }, function(err, comment) {
        if (err) {
            console.log(err);
        } else {
            campground.comments.push(comment);
            campground.save();
            console.log("Added a comment");
        }
    });
}

function deleteAll(databaseObject, next) {
    // Remove all campgrounds
    databaseObject.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed database objects!");
            next();
        }
    });
}

function associateUserWithCampground(user, campground) {
    var author = {
        id: user._id,
        username: user.username
    }
    Campground.findByIdAndUpdate(campground._id, {author: author}, function(err, updatedCampground) {
        if (err) { 
            console.log(err);
        } else {
            console.log("Associated user " + user.username + " with campground " + updatedCampground.name)
        }
    })
}

function associateUsersWithCampgrounds() {    
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            User.find({}, function(err, allUsers) {
                if (err) {
                    console.log(err);
                } else {
                    allCampgrounds.forEach(function (cg) {
                        associateUserWithCampground(allUsers[0], cg);
                    });
                }
            });
        }
    });
}

function seedDB() {
    // Remove all comments first
    Comment.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            initUsers();
            initCampgrounds();
            setTimeout(function() {
                associateUsersWithCampgrounds();
            }, 1000);
        }
    });
}

module.exports = seedDB;