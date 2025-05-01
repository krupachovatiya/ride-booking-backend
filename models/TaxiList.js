const mongoose = require("mongoose");

let taxiSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  starting: {
    type: Number,
  },
  charge: {
    type: Number,
  },
  seat: {
    type: Number,
  },
  image: {
    type: String,
  },
});

let TaxiData = mongoose.model("TaxiList", taxiSchema);

module.exports = TaxiData;
