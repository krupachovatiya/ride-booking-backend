const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
});

let UserData = mongoose.model("userData", userSchema);

module.exports = UserData;
