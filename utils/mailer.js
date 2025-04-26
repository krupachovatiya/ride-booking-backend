const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "mose.pfeffer@ethereal.email",
    pass: "PAzGGYQe3gZRQmAyZv",
  },
});

module.exports = transporter;
