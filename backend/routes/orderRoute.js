const express=require('express')
const orderRoute=express.Router();

const order=require('../controllers/order')

const {authCustomer}=require('../middleware/authUser')

orderRoute.post('/wishlist/:id', authCustomer, order.addto_wishlist);//add product to wishlist

orderRoute.put('/wishlist/:id', authCustomer, order.deleteitem_wishlist);//remove item from wishlist

orderRoute.get('/wishlist/', authCustomer, order.get_wishlist);//get wishlist

orderRoute.post('/order', order.makeOrder);//making order

orderRoute.get('/order/:id', order.getOrderStatus);//get order status

orderRoute.get('/orderhistory', order.order_history);//get order history

module.exports=orderRoute