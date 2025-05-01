const express = require("express");
const DriverUserData = require("../models/DriverUser");
const transporter = require("../utils/mailer");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const verificationCodes = {};
const Router = express.Router();
const userEmail = process.env.USER_EMAIL;

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET_KEY,
});

const uploadImage = async (base64String) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    if (!base64String || !base64String.startsWith("data:image")) {
      throw new Error("Invalid image data");
    }
    const result = await cloudinary.uploader.upload(base64String, options);
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

Router.get("/", async (req, res) => {
  try {
    const data = await DriverUserData.find();
    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching drivers", error: err.message });
  }
});

Router.post("/register", async (req, res) => {
  console.log("Request Body:", req.body);
  const { fullname, email, phone, password, licenseNo, licensePhoto } =
    req.body;

  try {
    const existingUser = await DriverUserData.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    verificationCodes[email] = code;

    await transporter.sendMail({
      from: userEmail,
      to: email,
      subject: "Your Verification Code",
      text: `Your code is: ${code}`,
    });

    let uploadedPhotoUrl = null;
    if (licensePhoto) {
      uploadedPhotoUrl = await uploadImage(licensePhoto);
      console.log("Uploaded photo URL:", uploadedPhotoUrl);
    }

    const newDriverUser = await DriverUserData.create({
      fullname,
      email,
      phone,
      password,
      licenseNo,
      licensePhoto: uploadedPhotoUrl,
    });
    console.log("User created:", newDriverUser);

    const token = jwt.sign(
      { _id: newDriverUser._id, email: newDriverUser.email },
      SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res
      .status(201)
      .json({ message: "Registered successfully", user: newDriverUser, token });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = Router;
