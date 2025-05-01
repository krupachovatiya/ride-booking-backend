const express = require("express");
const Router = express.Router();
const Taxi = require("../models/TaxiList");

Router.get("/taxi_list", async (req, res) => {
  try {
    const taxis = await Taxi.find();
    res.json(taxis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = Router;
