const port          = 3000;
const express       = require("express");
const mongoose      = require("mongoose");
const bodyParser    = require("body-parser");
const methodOverride = require("method-override");
const app           = express();

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true , useUnifiedTopology: true})
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// Database config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema, "blogs");

// RESTful routes

app.get("/", function(req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
    Blog.find({}).sort("-created").exec(function(err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    })
});

app.get("/blogs/new", function(req, res) {
    res.render("new");
});

app.post("/blogs", function(req, res) {
    var title = req.body.title;
    var img = req.body.image;
    var body = req.body.body;
    var post = {
        title: title,
        image: img,
        body: body
    }
    Blog.create(post, function(err, blog){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    });
});

app.get("/blogs/:id", function(req, res) {
    var id = req.params.id;
    Blog.findById(id, function(err, blog) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {blog: blog});
        }
    })
});

app.get("/blogs/:id/edit", function(req, res) {
    var id = req.params.id;
    Blog.findById(id, function(err, blog) {
        if (err) {
            console.log(err);
        } else {
            res.render("update", {blog: blog});
        }
    })
});

app.put("/blogs/:id", function(req, res) {
    var id = req.params.id;
    var title = req.body.title;
    var image = req.body.image;
    var body = req.body.body;
    var updatedBlog = {
        title: title,
        image: image,
        body: body
    }
    Blog.findByIdAndUpdate(id, updatedBlog, function(err, blog){
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blogs/" + id);
        }
    });
});

app.delete("/blogs/:id", function(req, res) {
    var id = req.params.id;
    Blog.findByIdAndRemove(id, function(err, blog) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    });
});


app.listen(port, function() {
    console.log("Server is listening on port " + port);
});





// Blog.create(
//     {
//         title: "Test blog post",
//         image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
//         body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in neque ante. Sed non congue diam. In magna tortor, condimentum ac arcu et, posuere tempor quam. Suspendisse potenti. Proin libero ante, finibus eget diam vitae, porta dictum sem. Duis sed congue nisi. Quisque ut ligula quis leo dapibus vulputate. Ut facilisis feugiat erat ut euismod. Nam semper sodales mi ut mollis. Sed sollicitudin a orci nec maximus. Nullam eu magna varius, euismod orci in, mollis erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam tincidunt, risus eget fermentum placerat, nulla magna iaculis lacus, dapibus tempor justo neque vel metus. Fusce ac risus mollis, cursus lectus sit amet, feugiat lectus. Pellentesque pulvinar arcu magna, sit amet convallis tortor tempus eget. Vivamus eget elit ac diam euismod cursus.\nQuisque id diam aliquam velit molestie pretium. Proin nec metus enim. Ut pharetra dapibus malesuada. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris malesuada, turpis vitae hendrerit lacinia, turpis metus accumsan felis, id lacinia velit nulla at metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis vel mollis ex. Quisque id dui et turpis ullamcorper euismod sit amet sit amet libero. Nulla mollis erat ac libero pellentesque, in laoreet lacus pellentesque. Fusce mattis mauris id fringilla fringilla. Sed nec tortor pharetra, convallis mi vel, condimentum augue. Pellentesque justo massa, venenatis et gravida nec, laoreet at sem. Sed lobortis, turpis at pulvinar imperdiet, purus nisi congue elit, pretium porttitor justo quam vel massa. Curabitur sed hendrerit urna.\nNulla facilisi. Etiam sed pellentesque ligula. Sed auctor euismod sapien nec accumsan. Ut ultrices ligula sit amet lorem eleifend, feugiat consectetur velit aliquam. Etiam non auctor nibh. Fusce tincidunt commodo nisl eget pharetra. Donec metus sem, fermentum quis risus ac, malesuada pellentesque ipsum. Vivamus egestas ultricies nisi, at imperdiet dolor. In convallis mauris non consectetur feugiat. Quisque venenatis eleifend ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae\nInteger varius lacinia erat a mollis. Quisque cursus pretium rhoncus. Nulla quis purus iaculis quam lacinia volutpat nec sed urna. Sed eu ante ante. Donec pharetra sodales massa, ut cursus ipsum venenatis ut. Sed nisi nibh, blandit in placerat nec, porta et risus. Aliquam vehicula placerat arcu ut malesuada. Cras placerat augue sem, nec convallis lorem ultrices quis. Maecenas orci felis, molestie eget dignissim sed, mollis vitae sapien. Ut pretium purus mollis felis aliquam malesuada. Etiam ante elit, consequat sit amet consectetur ac, tincidunt sit amet nisl. Nulla auctor consectetur nunc, sed vulputate metus. Sed eget libero purus. In eget tortor nec quam tincidunt consectetur."
//     },
//     function(err, blog) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("blogpost created");
//             console.log(blog);
//         }
//     }
// )