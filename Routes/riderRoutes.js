const express = require('express');
const router = express.Router();
const authenticateRider = require('../middlewares/riderauthen');
const riderController = require('../Controllers/riders');

// Rider login route
router.post('/login', riderController.riderLogin);

// View rider orders route
router.get('/orders/:riderId', authenticateRider, riderController.viewRiderOrders);

router.get('/order/:orderId', authenticateRider, riderController.viewRiderOrder);

// Change order status route
router.put('/orders/:orderId',authenticateRider ,riderController.changeOrderStatus);
module.exports = router;
