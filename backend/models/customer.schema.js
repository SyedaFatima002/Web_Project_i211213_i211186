const mongoose=require("mongoose")

const customerSchema=mongoose.Schema({
    username: {
        type: String, 
        required: true, 
        unique: true,
    }, 
    email:{
        type: String, 
        required: true, 
        unique: true,
    },
    password:{
        type: String, 
        required: true, 
    },
    role:{
        type:String, 
        enum:['admin', 'user'],
        default: 'user',
    },
    Address:[{
        address:{
            type:String, 
            required:true
        },
        city:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        }
    }],
    phoneNumber:{
        type:String,
        required:true
    },
    following:[{
        type:mongoose.Schema.Types.ObjectId,//the type is String for now (may be replaced with supplier later)
        ref:'Brand'
    }],
    notification:[{
        type:String,
    }],
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
    orderHistory:[{
        orderID:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Order'
        }, 
        date:{
            type:Date,
            default:Date.now
        }
    }], 
    loyaltyPoints:[{
        supplier:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Brand'
        },
        points:{
            type:Number
        }
    }],
    wishList:[{
        productID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
    }],
    notification:[{
        type:String
    }]
})

const Customer=mongoose.model('Customer', customerSchema)
module.exports=Customer;