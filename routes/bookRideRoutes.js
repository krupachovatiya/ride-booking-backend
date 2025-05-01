const express = require("express");
const BookRide = require("../models/BookRide");
const cors = require("cors");
const authMiddleware = require("../middlewere/authMiddlewere");

const Router = express.Router();
Router.use(cors());

Router.get("/", async (req, res) => {
  // res.send("all user data");
  let data = await BookRide.find();
  res.send(data);
});

Router.post("/register", authMiddleware, async (req, res) => {
  try {
    const { pickUp, dropOff, passenger, ridetype, date, time } = req.body;

    const newRide = await BookRide.create({
      user: req.user._id,
      pickUp,
      dropOff,
      passenger,
      ridetype,
      date,
      time,
    });

    console.log("New Ride:", newRide);

    res.status(201).json(newRide);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to book ride", error: err.message });
  }
});

module.exports = Router;
