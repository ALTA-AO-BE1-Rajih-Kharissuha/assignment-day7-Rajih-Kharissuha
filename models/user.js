const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: String,
    password: String,
    role: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
