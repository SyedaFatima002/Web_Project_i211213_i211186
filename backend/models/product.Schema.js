const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    name: {
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
    options:[{
        type:String//tells whether different sizes are available or color
    }],
    brand:{
        type:String,
        ref:'Brand' 
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
