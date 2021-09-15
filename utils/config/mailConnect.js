const nodemailer = require("nodemailer");

const mailConnect = async () => {
  const transport = await nodemailer.createTransport({
    host: "smtppro.zoho.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return transport;
};

module.exports = mailConnect;
