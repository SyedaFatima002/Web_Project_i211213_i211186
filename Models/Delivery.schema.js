const mongoose = require('mongoose');

const deliver = new mongoose.Schema({ // one company
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' },
  riders: [{ type: String }], // Array of strings for followers
  orders: [{ type: String }], // Array of strings for following
});

const User = mongoose.model('User', userSchema);

module.exports = User;
