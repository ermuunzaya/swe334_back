const mongoose = require("mongoose");

const shipperSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Shippers", shipperSchema);
