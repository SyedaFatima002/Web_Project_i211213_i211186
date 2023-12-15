//This is a dummy route and will be replaced
//with the supplier module later
const express=require('express');
const supplierRoute=express.Router();

const supplier=require('../controllers/supplier')

supplierRoute.post('/addBrand', supplier.add_supplier);//adding new supplier

supplierRoute.post('/addProduct/:id', supplier.add_Product);//adding new product and sending notification

module.exports=supplierRoute;
