const mongoose=require("mongoose");

//this will be replaced with the supplier module
const brandSchema=mongoose.Schema({
    name:{
        type:String, 
        required:String
    },
    Product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }]
})

const Brand=mongoose.model('Brand', brandSchema);
module.exports=Brand;