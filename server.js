const express = require("express");
const userRoutes = require("./routes/userRoutes");
const driverRoutes = require("./routes/driverRoutes");
const bookRideRoutes = require("./routes/bookRideRoutes");
const userDataRoutes = require("./routes/userDataRoutes");
const driverDataRoutes = require("./routes/driverDataRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const taxiRoutes = require("./routes/taxiRoutes");

const mongoose = require("mongoose");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());

server.use("/uploads", express.static("uploads"));

server.use("/user", userRoutes);
server.use("/driver", driverRoutes);
server.use("/book_ride", bookRideRoutes);
server.use("/user_data", userDataRoutes);
server.use("/driver_data", driverDataRoutes);
server.use("/payment_user", paymentRoutes);
server.use("/taxi", taxiRoutes);

server.get("/", (req, res) => {
  res.send("server is up");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/reg_database")
  .then(() => console.log("connected to db"));

server.listen(8000, () => console.log("server is listing on port 8000"));
