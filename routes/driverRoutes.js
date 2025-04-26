const express = require("express");
const DriverUser = require("../models/DriverUser");
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

// const uploadImage = async (imagePath) => {
//   const options = {
//     use_filename: true,
//     unique_filename: false,
//     overwrite: true,
//   };

//   try {
//     const result = await cloudinary.uploader.upload(imagePath, options);
//     console.log(result);
//     return result.secure_url;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

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
    const data = await DriverUser.find();
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
    const existingUser = await DriverUser.findOne({ email });

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

    const newUser = await DriverUser.create({
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

Router.post("/register_varification", async (req, res) => {
  let data = req.body;
  let newUser = DriverUser.create(data);
  res.send(newUser);
});

Router.post("/register_varify_resend", async (req, res) => {
  const { email } = req.body;
  console.log("Received email:", email);

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await DriverUser.findOne({ email });

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
    const log = await DriverUser.findOne({ email });

    if (!log?.email) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Login successful", log });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

Router.post("/forgot_pass", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await DriverUser.findOne({ email });

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

Router.post("/forgot_pass_verifycode", (req, res) => {
  let data = req.body;
  let newUser = DriverUser.create(data);
  res.send(newUser);
});

Router.post("/forgot_pass_resend", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await DriverUser.findOne({ email });

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
    const user = await DriverUser.findOneAndUpdate(
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
