const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  // const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = favorite
    ? await Contact.find(
        { owner, favorite: favorite },
        // { owner: _id, favorite: favorite },
        "-createdAt -updatedAt",
        {
          skip,
          limit: Number(limit),
        }
      ).populate("owner", "email")
    : await Contact.find({ owner }, "-createdAt -updatedAt", {
        skip,
        limit: Number(limit),
      }).populate("owner", "email");
  res.json(result);
};

module.exports = getAll;
