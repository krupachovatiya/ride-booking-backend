const express = require("express");
const DriverUserData = require("../models/DriverUser");
const transporter = require("../utils/mailer");
const cloudinary = require("cloudinary").v2;

const verificationCodes = {};
const Router = express.Router();
const userEmail = "mose.pfeffer@ethereal.email";

cloudinary.config({
  cloud_name: "dbkosylcf",
  api_key: "111175334357878",
  api_secret: "pqe4cm4967rQIT94C_dOZV329bs",
});

const uploadImage = async (base64String) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Validate Base64 string
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

    // res.status(200).json({ message: "Verification code sent to email" });

    let uploadedPhotoUrl = null;
    if (licensePhoto) {
      uploadedPhotoUrl = await uploadImage(licensePhoto);
      console.log("Uploaded photo URL:", uploadedPhotoUrl);
    }

    const newUser = await DriverUserData.create({
      fullname,
      email,
      phone,
      password,
      licenseNo,
      licensePhoto: uploadedPhotoUrl,
    });
    console.log("User created:", newUser);
    res.status(201).json({ message: "Registered successfully", user: newUser });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = Router;
