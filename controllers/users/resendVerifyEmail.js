const { User } = require("../../models/user");

const { RequestError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw RequestError(400, "missing required field email");
  }
  const user = await User.findOne({ email });
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Please verify your email address",
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Verify email address</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
