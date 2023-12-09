const { json } = require("express");
const user = require("../modals/users");
exports.findUser = async function (req, res, next) {
  let u;
  await user.findById(req._id).then(async (d) => await (u = d));
  return u;
};
