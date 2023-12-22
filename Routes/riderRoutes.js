const express = require('express');
const router = express.Router();
const authenticateRider = require('../middlewares/riderauthen');
const riderController = require('../controllers/riderController');

// Rider login route
router.post('/login', riderController.riderLogin);

// View rider orders route
router.get('/orders', authenticateRider, riderController.viewRiderOrders);

// Change order status route
router.patch('/orders/:orderId',authenticateRider ,riderController.changeOrderStatus);

module.exports = router;
