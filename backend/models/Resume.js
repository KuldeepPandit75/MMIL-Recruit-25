const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  file: Buffer,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resume", resumeSchema);
