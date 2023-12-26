const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  location: { type: String, required: true },
  deliverydate: { type: Date, required: true },
  assigned: {
    type: Boolean,
    default:false,
  },
  status: {
    type: String,
    enum: ['At Warehouse', 'Pickedup by Delivery', 'Sent by Rider', 'Delivered', 'Canceled'],
    default: 'At Warehouse',
  },
  client_phone: { type: String, required: true },
  order_number: { type: String, required: true, unique: true },
  // Other order-related fields can be added here
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
