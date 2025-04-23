const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
});

let User = mongoose.model("user", userSchema);

module.exports = User;
