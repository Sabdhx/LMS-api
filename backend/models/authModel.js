const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ['student', 'teacher'], // Only allows these two values
      required: true // Makes role a required field
    },
  },
  
);

const userModel = mongoose.model("User", userSchema); // Changed to "User" for convention
module.exports = userModel;
