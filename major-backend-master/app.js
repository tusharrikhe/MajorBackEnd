const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();
const users = require("./routes/users");
const userProfile = require("./routes/userProfile");
const orgs = require("./routes/orgs");
const orgProfile = require("./routes/orgProfile");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys.js").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Welcome to Home Page !"));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/userPassport")(passport);
//require("./config/orgPassport")(passport);

//Use Routes
app.use("/api/users", users);
app.use("/api/useProfile", userProfile);
app.use("/api/orgs", orgs);
app.use("/api/orgProfile", orgProfile);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
