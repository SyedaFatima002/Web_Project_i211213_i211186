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

customerRoute.put('/follow/:id', authCustomer, customer.follow_brand);//following brand

customerRoute.put('/unfollow/:id', authCustomer, customer.unfollow_brand);//unfollowing brand

customerRoute.get('/notifications', authCustomer, customer.view_notification);//getting all notifications

customerRoute.get('/loyaltyPoints', authCustomer, customer.get_loyaltyPoints);//see loyalty points

customerRoute.post('/comment/:id', authCustomer, customer.comment_item);//commenting under item

customerRoute.post('/rateProduct/:id', authCustomer, customer.rate_item);//rating item

module.exports=customerRoute;