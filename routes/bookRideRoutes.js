const express = require("express");
const BookRide = require("../models/BookRide");
const path = require("path");
const cors = require("cors");

const Router = express.Router();
Router.use(cors());
Router.use(express.static(path.join(__dirname, "public")));

const taxiData = [
  {
    id: 1,
    name: "Silverado",
    starting: 99,
    charge: 9,
    seat: 4,
    image: "/image/taxi-img1.jpg",
  },
  {
    id: 2,
    name: "Pathfinder",
    starting: 79,
    charge: 10,
    seat: 6,
    image: "/image/taxi-img2.jpg",
  },
  {
    id: 3,
    name: "Mazda3",
    starting: 89,
    charge: 8,
    seat: 7,
    image: "/image/taxi-img3.jpg",
  },
  {
    id: 4,
    name: "Santa Fe",
    starting: 100,
    charge: 12,
    seat: 6,
    image: "/image/taxi-img3.jpg",
  },
  {
    id: 5,
    name: "Volvo 3.0",
    starting: 150,
    charge: 15,
    seat: 4,
    image: "/image/taxi-img3.jpg",
  },
  {
    id: 6,
    name: "Silverado",
    starting: 130,
    charge: 11,
    seat: 7,
    image: "/image/taxi-img3.jpg",
  },
];

Router.get("/taxi_list", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Taxi list fetched successfully",
    data: taxiData,
  });
});

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
