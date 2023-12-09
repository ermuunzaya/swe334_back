const mongoose = require("mongoose");

const catalogSchema = new mongoose.Schema({
  img: {
    type: String,

  },
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
  text: {
    type: String,
  },
  parent: {
    type: mongoose.Types.ObjectId,
    ref: "Catalog",
  },
});

module.exports = mongoose.model("Catalog", catalogSchema);
