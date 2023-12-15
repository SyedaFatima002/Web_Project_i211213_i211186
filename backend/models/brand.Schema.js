const mongoose=require("mongoose");

//this will be replaced with the supplier module
const brandSchema=mongoose.Schema({
    name:{
        type:String, 
        required:String
    },
    products:[{
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