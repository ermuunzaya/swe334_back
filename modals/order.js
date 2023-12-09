const mongoose = require("mongoose");

const products = {
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
  },
};

const orderSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  method: {
    type: String,
  },
  status: {
    type: String,
  },
  shipper: {
    type: mongoose.Types.ObjectId,
    res: "Shippers",
  },
  user: {
    type: mongoose.Types.ObjectId,
    res: "Users",
    required: true,
  },

  products: [products],
});

module.exports = mongoose.model("Orders", orderSchema);
