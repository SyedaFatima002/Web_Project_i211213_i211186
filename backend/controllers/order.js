const Customer=require('../models/customer.Schema');
const Order=require('../models/order.schema');
const Product=require('../models/product.Schema');
const Wishlist=require('../models/wishlist.Schema')

//add item to wishlist
exports.addto_wishlist=async(req, res)=>{
    const token=req.token;

    const productId=req.params.id;

    if (!token){
        return res.status(401).json({message:'You are not authorized to add to wishlist'});
    }

    try{
        const product=await Product.findById(productId);

        //seeing if the product exists
        if (!product){
            return res.status(404).json({message: 'Item not found'});
        }

        //check if customer has used wishlist before
        const custWishList=await Wishlist.findOne({ customer: token.userid });

        //if they have simply push product id
        if (custWishList){
            custWishList.products.push({ productId: product._id });
            await custWishList.save();
        }
        else{ //if they havent create a new wishlist
            const newWishlist = new Wishlist({
                customer: token.userid,
                products: [{ productId: product._id }],
            });

            await newWishlist.save();
        }

       res.status(200).json({message: 'Product successfully added to wishlist'});

    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error in adding product to wishlist'});
    }
}

//delete item from wishlist
exports.deleteitem_wishlist=async(req, res)=>{
    const token=req.token;

    const productId=req.params.id;

    if (!token){
        return res.status(401).json({message:'You are not authorized to add to wishlist'});
    }

    try{
        //see if customer has a wishlist
        const custwishlist=await Wishlist.findOne({ customer: token.userid })

        if (!custwishlist){
            return res.status(404).json({message: 'Wishlist not found'});
        }

        //see if product exists in the wishlist
        //if product is in the wishlist then remove it
        var present=custwishlist.products.some(product => product.productId.equals(productId))
        if (!present){
            return res.status(400).json({message:'Product is not present in wishlist'})
        }

        await Wishlist.findByIdAndUpdate(custwishlist._id,  { $pull: { products: { productId: productId } } });
        res.status(200).json({message:'Item successfully removed from wishlist'})

    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error in deleting product from wishlist'});
    }
}

//view wishlist
exports.get_wishlist=async(req, res)=>{
    const token=req.token;

    if (!token){
        return res.status(401).json({message:'Token not found. You are not authorization to view notifications'});
    }

    try{
        const custwishlist=await Wishlist.findOne({customer: token.userid});

        if (!custwishlist){
            return res.status(404).json({message: 'Empty wishlist'});
        }

        //get all the products in the wishlist
        const products=custwishlist.products.map(product => product.productId)
        const wishlistProducts = await Product.find({ _id: { $in: products } });

        //send the products
        res.status(200).json(wishlistProducts)

    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error in getting wishlist'});
    }
}

//make order
exports.makeOrder=async(req, res)=>{
    try{
        const order=new Order({
            customer:req.body.customer,
            products:req.body.products,
            totalAmount:req.body.totalAmount,
            paymentMethod:req.body.paymentMethod,
            status:req.body.status
        });
        await order.save();
        res.status(201).json({order})

    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error in creating order'});
    }
}

//view order status in terms of delivery
exports.getOrderStatus=async(req, res)=>{
    const orderid=req.params.id

    try{
        const order=await Order.findById(orderid);

        if (!order){
            return res.status(404).json({message:'Order not Found'})
        }

        res.status(200).json({
            "order status":order.status,
            "order":order
        })

    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error in getting order'});
    }
}

//view order history
exports.order_history=async(req, res)=>{
    const {email}=req.body;

    try{
        const orders=await Order.find({"customer.email":email})
        
        if (!orders){
            return res.status(404).json({message:'Order History not Found'})
        }

        res.status(200).json({orders})
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error in getting order history'});
    }
}
