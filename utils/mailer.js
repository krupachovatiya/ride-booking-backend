const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "elva10@ethereal.email",
    pass: "179sQNb9umeZuDgdCc",
  },
});

module.exports = transporter;
