const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    defualt: Date.now
  }
});

module.exports = Users = mongoose.model("users", UserSchema); // users is the name we wanna use and UserSchema is the schema that mongoose.model accepts as the second argument
