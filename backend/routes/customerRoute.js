const express=require('express');
const customerRoute=express.Router();

var customer=require('../controllers/customer')

customerRoute.post('/signup', customer.signup);//signing in

customerRoute.post('/customer', customer.login);//logging in

module.exports=customerRoute;