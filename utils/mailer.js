const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "johnathan.stiedemann42@ethereal.email",
    pass: "gdswSP41eDMbXuV5Qy",
  },
});

module.exports = transporter;
