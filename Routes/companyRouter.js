const express = require('express');
const router = express.Router();
const companyController = require('../Controllers/company');

// company routes

router.post('/companies', companyController.createCompany);

router.post('/new-rider', companyController.createNewRider);

router.delete('/delete-rider/:id', companyController.deleteRider);

router.get('/riders-list/:id', companyController.showCompanyRider);

router.get('/riders-list', companyController.showCompanyRiders);

router.put('/give-job', companyController.assignOrdersToRider);

router.put('/update-job', companyController.removeOrdersFromRider);

router.put('/cancel-order/:id', companyController.cancelOrders);


module.exports = router;
