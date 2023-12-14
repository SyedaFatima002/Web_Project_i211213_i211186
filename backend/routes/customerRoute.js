const express=require('express');
const customerRoute=express.Router();

const customer=require('../controllers/customer')

const {authCustomer}=require('../middleware/authUser')


customerRoute.post('/signup', customer.signup);//signing in

customerRoute.post('/login', customer.login);//logging in

customerRoute.put('/profile/username', authCustomer, customer.update_username);//updaring username

customerRoute.put('/profile/email', authCustomer, customer.update_email);//updating email

customerRoute.put('/profile/password', authCustomer, customer.update_password);//updating password

customerRoute.post('/profile/address', authCustomer, customer.add_newaddress);//add new address

customerRoute.put('/profile/address/:id', authCustomer, customer.update_address);//updating specific address

customerRoute.put('/profile/phone', authCustomer, customer.update_phoneNumber);//updating phone number

customerRoute.get('/profile/', authCustomer, customer.getcustomer_profile);//getting user profile


module.exports=customerRoute;