const { Contact } = require("../../models/contact");

const getAll = async (_, res) => {
  const result = await Contact.find();
  // const result = await Book.find({}, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = getAll;
