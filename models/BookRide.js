const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  phone: {
    type: String,
  },
  pickUp: {
    type: String,
  },
  dropOff: {
    type: String,
  },
  passenger: {
    type: Number,
  },
  ridetype: {
    type: String,
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
});

let BookRide = mongoose.model("bookride", userSchema);

module.exports = BookRide;
