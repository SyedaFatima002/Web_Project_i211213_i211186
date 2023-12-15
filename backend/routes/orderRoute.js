const express=require('express')
const orderRoute=express.Router();

const order=require('../controllers/order')

const {authCustomer}=require('../middleware/authUser')

orderRoute.post('/wishlist/:id', authCustomer, order.addto_wishlist);//add product to wishlist

orderRoute.put('/wishlist/:id', authCustomer, order.deleteitem_wishlist);//remove item from wishlist



module.exports=orderRoute