const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nama: String,
    stok: Number,
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
