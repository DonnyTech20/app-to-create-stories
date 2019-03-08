const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// Load User Model
require("./models/User");

// Load Keys
const keys = require("./config/keys");


// Passport Config
require("./config/passport")(passport);


// Load Routes
const auth = require("./routes/auth");


// Map Global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose.connect(keys.mongoURI, {
  useMongoClient:true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome Back Dev Donny");
});

// Use Route
app.use("/auth", auth);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
