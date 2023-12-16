const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' },
  riders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rider' }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
