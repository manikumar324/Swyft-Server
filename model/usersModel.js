const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define the user schema
const userSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true,
    immutable: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;
