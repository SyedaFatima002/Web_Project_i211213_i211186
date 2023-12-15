const mongoose=require("mongoose")

const wishlistSchema=mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // Reference to the Customer model
        required: true,
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Reference to the Product model
            required: true,
        }
    }],
})

const Wishlist=mongoose.model('Wishlist', wishlistSchema)
module.exports=Wishlist