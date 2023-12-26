const express = require('express');
const router = express.Router();
const companyController = require('../Controllers/company');
const authenticateCompany = require('../middlewares/companyauthen');

// company routes

router.post('/companies',companyController.createCompany);

router.post('/login',companyController.companyLogin);

router.post('/new-rider',companyController.createNewRider);

router.delete('/delete-rider/:riderId', companyController.deleteRider);

router.get('/riders-list/:id',  companyController.showCompanyRider);

router.get('/rider-orders/:riderId', companyController.viewRiderOrders);

router.get('/riders-list',  companyController.showCompanyRiders);

router.get('/orders-list',  companyController.showCompanyOrders);

router.post('/new-order', companyController.newOrder);

router.get('/orders/:orderNumber', companyController.viewOrderByOrderNumber);

router.put('/give-job/:orderNumber', companyController.assignOrdersToRider);

router.put('/update-job', authenticateCompany, companyController.removeOrdersFromRider);

router.put('/cancel-order/:id', authenticateCompany, companyController.cancelOrders);


module.exports = router;
