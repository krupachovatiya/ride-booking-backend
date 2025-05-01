const mongoose = require("mongoose");
const Taxi = require("../models/TaxiList");

const taxis = [
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
    image: "/image/taxi-img1.jpg",
  },
  {
    id: 5,
    name: "Volvo 3.0",
    starting: 150,
    charge: 15,
    seat: 4,
    image: "/image/taxi-img2.jpg",
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

const TaxiData = async () => {
  await mongoose.connect("mongodb://localhost:27017/reg_database");
  await Taxi.deleteMany({});
  await Taxi.insertMany(taxis);
  console.log("Taxi list add!");
  mongoose.disconnect();
};

TaxiData();
