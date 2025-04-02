const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  // Other user properties and validations can be defined here
});

const User = mongoose.model('User', userSchema);

module.exports = User;