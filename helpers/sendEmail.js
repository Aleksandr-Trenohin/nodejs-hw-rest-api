const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, VERIFIED_SENDER } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: VERIFIED_SENDER };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw new Error();
  }
};

module.exports = sendEmail;
