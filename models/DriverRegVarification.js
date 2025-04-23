const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  verifycode: {
    type: Number,
  },
});

let DriverUser = mongoose.model("driverUser", userSchema);

module.exports = DriverUser;
