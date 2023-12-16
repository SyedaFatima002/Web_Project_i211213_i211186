const mongoose=require("mongoose");

//this will be replaced with the supplier module
const brandSchema=mongoose.Schema({
    brandname:{//this is the company's name
        type:String, 
        required:String
    },
    products:[{//all the products they sell
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    }],
    image:{
        type:String
    }
})

const Brand=mongoose.model('Brand', brandSchema);
module.exports=Brand;