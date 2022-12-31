const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const homeStartingContent =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
const aboutContent =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
const contactContent =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
const posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    posts: posts,
  });
});
app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});
app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});
app.post("/compose", function (req, res) {
  const compose = {
    title: req.body.composeTitle,
    post: req.body.composePost,
  };
  posts.push(compose);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  const postName = req.params.postName;
  posts.forEach(function (post) {
    if (_.lowerCase(postName) === _.lowerCase(post.title)) {
      res.render("post", { post: post });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
