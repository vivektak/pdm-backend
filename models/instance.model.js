const mongoose = require("mongoose");

const instanceModel = mongoose.Schema(
  {
    name: String,
    image: String,
    refinery: Array,
    createdDate: Date,
    createdBy: String,
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("instance", instanceModel);