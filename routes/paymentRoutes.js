const express = require("express");
const Payment = require("../models/Payment");
const cors = require("cors");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Router = express.Router();
Router.use(cors());

Router.post("/payment", async (req, res) => {
  const { name, price } = req.body;

  try {
    const amount = Math.round(price);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      description: `Payment by ${name}`,
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = Router;
