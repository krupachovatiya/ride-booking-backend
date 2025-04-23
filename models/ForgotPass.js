const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  mode: {
    type: String,
    default: "",
  },
});

let User = mongoose.model("user", userSchema);

module.exports = User;
