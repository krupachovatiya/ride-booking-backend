const express = require("express");
const User = require("../models/LoginUser");
const transporter = require("../utils/mailer");
const UserData = require("../models/User");
const jwt = require("jsonwebtoken");
const SECRET_KEY =
  "a406929be78ab6924730b60822d633cfb846265633e2bf4da0d41a334250c1fb";

const verificationCodes = {};
const userEmail = "adelbert.zieme13@ethereal.email";

const Router = express.Router();
require("dotenv").config();

Router.post("/register_varification", async (req, res) => {
  try {
    const data = req.body;
    const newUser = await User.create(data);
    res.status(201).json({
      message: "Driver registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in register_varification:", error);
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
});

Router.post("/register_varification_resend", async (req, res) => {
  const { email } = req.body;
  console.log("Received email:", email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    verificationCodes[email] = code;

    await transporter.sendMail({
      from: userEmail,
      to: email,
      subject: "Your Verification Code",
      text: `Your code is: ${code}`,
    });

    res.status(200).json({ message: "Verification code sent to email" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error sending email", error: err.message });
  }
});

Router.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    const log = await UserData.findOne({ email });

    if (!log?.email) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ _id: log._id, email: log.email }, SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login successful", token, log });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

Router.post("/forgot_pass", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserData.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    verificationCodes[email] = code;

    await transporter.sendMail({
      from: userEmail,
      to: email,
      subject: "Your Verification Code",
      text: `Your code is: ${code}`,
    });

    res.status(200).json({ message: "Verification code sent to email" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error sending email", error: err.message });
  }
});

Router.post("/forgot_pass_verifycode", async (req, res) => {
  try {
    const data = req.body;

    const newUser = await User.create(data);

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
});

Router.post("/forgot_pass_resend", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    verificationCodes[email] = code;

    await transporter.sendMail({
      from: userEmail,
      to: email,
      subject: "Your Verification Code",
      text: `Your code is: ${code}`,
    });

    res.status(200).json({ message: "Verification code sent to email" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error sending email", error: err.message });
  }
});

Router.post("/reset_password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { password: newPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = Router;
