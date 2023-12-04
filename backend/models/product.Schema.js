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
    supplier:{
        type:String, //will replace with supplier module later
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
