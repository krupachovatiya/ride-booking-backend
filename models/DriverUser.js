const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  licenseNo: {
    type: String,
  },
  licensePhoto: {
    type: String,
  },
});

let DriverUser = mongoose.model("driverUser", userSchema);

module.exports = DriverUser;
