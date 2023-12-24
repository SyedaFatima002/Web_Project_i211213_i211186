const express = require('express');
const router = express.Router();
const companyController = require('../Controllers/company');
const authenticateCompany = require('../middlewares/companyauthen');

// company routes

router.post('/companies',companyController.createCompany);

router.post('/login',companyController.companyLogin);

router.post('/new-rider', authenticateCompany,companyController.createNewRider);

router.delete('/delete-rider/:id', authenticateCompany,companyController.deleteRider);

router.get('/riders-list/:id', authenticateCompany, companyController.showCompanyRider);

router.get('/riders-list',  authenticateCompany,companyController.showCompanyRiders);

router.get('/orders-list',  companyController.showCompanyOrders);

router.put('/give-job',  authenticateCompany,companyController.assignOrdersToRider);

router.put('/update-job', authenticateCompany, companyController.removeOrdersFromRider);

router.put('/cancel-order/:id', authenticateCompany, companyController.cancelOrders);


module.exports = router;
