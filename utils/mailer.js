const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "adelbert.zieme13@ethereal.email",
    pass: "kfJbHgGt8upQV2c42P",
  },
});

module.exports = transporter;
