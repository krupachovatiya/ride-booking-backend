const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  verifycode: {
    type: Number,
  },
});

let User = mongoose.model("user", userSchema);

module.exports = User;
