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

let DriverUser = mongoose.model("driverUser", userSchema);

module.exports = DriverUser;
