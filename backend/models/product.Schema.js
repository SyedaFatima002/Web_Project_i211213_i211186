const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    name: {//of the product
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image:{
        type:String, 
    },
    categories:{//catagory
        type:[String],//type of equipment
    },
    options:[{
        type:String//tells whether different sizes are available or color
    }],
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Brand' 
    }, 
    discount:[{
        type:Number
    }],
    soldout:{
        type:Boolean,
        default:false
    },
    comments:[{
        customer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Customer'
        },
        comment:{
            type:String
        }
    }],
    ratings: [
        {
            customer: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User', required: true 
            },
            rating: { 
                type: Number, 
                required: true, 
                min: 1, max: 5 
            },
        }
    ]

})

const Product=mongoose.model('Product', productSchema)

module.exports=Product
