const mongoose = require("mongoose");

const orderSchema=mongoose.Schema({
    customer: {
        name:{type:String, required:true},
        email:{type:String, required:true},
        phone:{type:String, required:true},
        address:{type:String, required:true},
        city:{type:String, required:true},
        country:{type:String, required:true}
    },
    products: [{
        productID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Reference to the Product model
            required: true,
        },
        productname:{type:String, required:true},
        brand:{type:String, required:true},
        unitprice:{type:Number, required:true},
        options:[{
            type:String
        }],
        discount:{type:Number}
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentMethod:{
        type:String, //update this if needed
        required:true,
        enum:['cash on delivery', 'Credit Card']
    },
    status:{//in temrs of delievery
        type:String,
        required:true
    }
}, {timestamps:true})

const Order=mongoose.model('Order', orderSchema)
module.exports=Order