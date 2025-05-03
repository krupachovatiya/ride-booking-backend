const express = require("express");
const UserData = require("../models/User");
const transporter = require("../utils/mailer");
const jwt = require("jsonwebtoken");
const SECRET_KEY =
  "a406929be78ab6924730b60822d633cfb846265633e2bf4da0d41a334250c1fb";
const userEmail = "adelbert.zieme13@ethereal.email";

require("dotenv").config();

const verificationCodes = {};

const Router = express.Router();
Router.get("/", async (req, res) => {
  res.send("all user data");
  let data = await UserData.find();
  res.send(data);
});

Router.post("/register", async (req, res) => {
  console.log("Request Body:", req.body);
  const { fullname, email, phone, password } = req.body;

  try {
    const existingUser = await UserData.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    verificationCodes[email] = code;

    console.log("Email sending in:", email);
    await transporter.sendMail({
      from: userEmail,
      to: email,
      subject: "Your Verification Code",
      text: `Your code is: ${code}`,
    });

    const newUser = await UserData.create({ fullname, email, phone, password });
    console.log("User created:", newUser);
    res.send(newUser);
    // const token = jwt.sign(
    //   { _id: newUser._id, email: newUser.email },
    //   SECRET_KEY,
    //   {
    //     expiresIn: "7d",
    //   }
    // );
    res.status(200).json({ message: "Registered successfully", user: newUser });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = Router;
