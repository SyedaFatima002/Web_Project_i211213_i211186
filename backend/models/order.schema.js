const mongoose = require("mongoose");

const orderSchema=mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // Reference to the Customer model
        required: true,
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Reference to the Product model
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentMethod:{
        type:String //update this if needed
    }

}, {timestamps:true})

const Order=mongoose.model('Order', orderSchema)
module.exports=Order