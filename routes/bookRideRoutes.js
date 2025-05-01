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
  let data = req.body;
  let newUser = BookRide.create(data);
  res.send(newUser);
});

module.exports = Router;
