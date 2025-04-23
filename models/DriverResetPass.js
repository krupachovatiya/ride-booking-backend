const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

let DriverUser = mongoose.model("driverUser", userSchema);

module.exports = DriverUser;
