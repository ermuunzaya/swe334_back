const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  imgs: {
    type: [String],
  },
  brand: {
    type: String,
  },
  code: {
    type: String,
  },
  catalog: { type: mongoose.Schema.Types.ObjectId, ref: "Catalog" },
  count: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Products", productSchema);
