const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../../models/user");

const { RequestError, sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Please verify your email address",
    html: `<a href="http://phonebook-rest-api-a.herokuapp.com/api/users/verify/${verificationToken}" target="_blank">Verify email address</a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    email: result.email,
    subscription: "starter",
  });
};

module.exports = signup;
