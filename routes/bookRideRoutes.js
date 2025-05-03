const express = require("express");
const BookRide = require("../models/BookRide");
const cors = require("cors");

const Router = express.Router();
Router.use(cors());

Router.get("/", async (req, res) => {
  // res.send("all user data");
  let data = await BookRide.find();
  res.send(data);
});

Router.post("/register", async (req, res) => {
  try {
    const { userId, pickUp, dropOff, passenger, ridetype, date, time } =
      req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newRide = await BookRide.create({
      user: userId,
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
