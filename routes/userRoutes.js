const express = require("express");
const User = require("../models/User");
const transporter = require("../utils/mailer");
const jwt = require("jsonwebtoken");
const SECRET_KEY =
  "a406929be78ab6924730b60822d633cfb846265633e2bf4da0d41a334250c1fb";

const verificationCodes = {};

const Router = express.Router();

Router.get("/", async (req, res) => {
  res.send("all user data");
  let data = await User.find();
  res.send(data);
});

Router.post("/register", async (req, res) => {
  console.log("Request Body:", req.body);
  const { fullname, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    verificationCodes[email] = code;

    await transporter.sendMail({
      from: "elva10@ethereal.email",
      to: email,
      subject: "Your Verification Code",
      text: `Your code is: ${code}`,
    });

    // res.status(200).json({ message: "Verification code sent to email" });

    const newUser = await User.create({ fullname, email, phone, password });
    console.log("User created:", newUser);
    res.status(200).json({ message: "Registered successfully", user: newUser });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

Router.post("/register_varification", async (req, res) => {
  let data = req.body;
  let newUser = User.create(data);
  res.send(newUser);
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
      from: "elva10@ethereal.email",
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

// Router.put("/update", (req, res) => {
//   res.send("user updated");
// });

// Router.delete("/delete", (req, res) => {
//   res.send("user deleted");
// });

Router.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    const log = await User.findOne({ email });

    if (!log?.email) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = jwt.sign({ id: log._id, email: log.email }, SECRET_KEY, {
      expiresIn: "1h",
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
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    verificationCodes[email] = code;

    await transporter.sendMail({
      from: "elva10@ethereal.email",
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

Router.post("/forgot_pass_verifycode", (req, res) => {
  let data = req.body;
  let newUser = User.create(data);
  res.send(newUser);
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
      from: "elva10@ethereal.email",
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
