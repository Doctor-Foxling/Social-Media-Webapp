const express = require("express");
const mongoose = require("mongoose");

const app = express();

const users = require("./Routes/API/users.js");
const posts = require("./Routes/API/posts.js");
const profile = require("./Routes/API/profile.js");

// DB Config
const db = require("./config/keys.js").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error :" + err));

app.get("/", (req, res) => {
  res.send("hello bitch");
});

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000; // when deploying to heroku, 'process.env.PORT' is required else 5000 is used when running locally

app.listen(port, () => console.log(`Server running on port ${port}`));
