const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { userId } = req.params;
    const result = await User.findByIdAndUpdate(userId, req.body, { new: true });
   if (!result) {
    throw RequestError(404, "Not found");
  }
  const { email, subscription } = result;
  res.json({ email, subscription });
};

module.exports = updateSubscription;
