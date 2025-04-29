const express = require("express");
const Payment = require("../models/Payment");
const cors = require("cors");

const Router = express.Router();
Router.use(cors());

Router.get("/", async (req, res) => {
  // res.send("all user data");
  let data = await Payment.find();
  res.send(data);
});

Router.post("/payment", async (req, res) => {
  let data = req.body;
  let newUser = Payment.create(data);
  res.send(newUser);
});

module.exports = Router;
