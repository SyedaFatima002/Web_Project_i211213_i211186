const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  email: { type: String, required: true , unique: true}, 
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone_number: { type: String, required: true },
  address: { type: String, required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  // Other rider-related fields can be added here
});

const Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider;
