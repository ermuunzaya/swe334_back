const mongoose = require("mongoose");

const billSchmea = new mongoose.Schema({

  type: {
    type: String,
    required: true,
  },
  invoceId: {
    type: String,
  },
  price: {
    type: Number,
  },

  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});

module.exports = mongoose.model("Bills", billSchmea);
