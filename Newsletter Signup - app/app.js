//First we need to install npm @mailchimp/mailchimp_marketing
//Requiring express and body parser and initializing the constant "app"
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing"); // you need to add dependency first. See in tips.

const app = express();
//Working .css file on port
app.use(express.static(__dirname));
//Using body parser
app.use(bodyParser.urlencoded({ extended: true }));
//Sending the index.html file to the browser as soon as a request is made on port
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
//Setting up mailchimp with api key and server
client.setConfig({
  apiKey: "",
  server: "",
});
//As soon as the sign in button is pressed execute this code
app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  console.log(firstName, lastName, email);
  //Creating object with the user data
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };
  //Uploading data to the server
  const run = async () => {
    try {
      const response = await client.lists.addListMember(
        "", //mailchimp audience ID
        {
          email_address: subscribingUser.email,
          status: "subscribed",
          merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName,
          },
        }
      );
      console.log(response);
      //If all goes well logging the contact ID
      res.sendFile(__dirname + "/success.html");
    } catch (err) {
      console.log(err.status);
      //If not
      res.sendFile(__dirname + "/failure.html");
    }
  };

  run();
});
//Failure at login redirect to the home page
app.post("/failure", function (req, res) {
  res.redirect("/");
});
//Listening on port
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port.");
});
