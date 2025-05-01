const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  cardNumber: {
    type: Number,
  },
  expiredate: {
    type: Date,
  },
  cvc: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

let Payment = mongoose.model("payment", paymentSchema);

module.exports = Payment;
