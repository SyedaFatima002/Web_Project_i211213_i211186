const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    name: {//of the product
        type: String,
        required: true,
    },
    description: {//of the product
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image:{//can be an image/url from google
        type:String, 
    },
    sport:{//the product is for could be general as well
        type:String
    },
    categories:{//catagory as in is the product an accessory etc
        type:[String],
    },
    options:[{
        type:String//tells whether different sizes are available 
    }],
    color:[{
        type:String
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
