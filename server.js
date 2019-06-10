const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

const users = require("./Routes/API/users.js");
const posts = require("./Routes/API/posts.js");
const profile = require("./Routes/API/profile.js");

// body parser middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys.js").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, autoIndex: false })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error :" + err));

// passport middle-ware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport); // passing in passport itself

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/post", posts);

const port = process.env.PORT || 5000; // when deploying to heroku, 'process.env.PORT' is required else 5000 is used when running locally

app.listen(port, () => console.log(`Server running on port ${port}`));
