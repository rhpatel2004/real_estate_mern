// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Plain text for simplicity
  role: { type: String, required: true, enum: ['seller', 'buyer'] },
});

const User = mongoose.model('User', userSchema);

module.exports = User;