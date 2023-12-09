const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cartSchema = {
  quantity: Number,
  id: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
};
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  type: String,
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  address1: {
    type: String,
  },
  phone: {
    type: String,
  },
  address2: {
    type: String,
  },

  city: {
    type: String,
  },
  postcode: {
    type: String,
  },
  country: {
    type: String,
  },
  region: {
    type: String,
  },
  cart: [cartSchema],
  wish: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, "jwtKey");
  return token;
};

module.exports = mongoose.model("Users", userSchema);
