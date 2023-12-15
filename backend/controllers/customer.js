const Customer=require("../models/customer.Schema")
const Brand=require("../models/brand.Schema")
const Product=require("../models/product.Schema")
const jwt=require("jsonwebtoken")

//create new customer
exports.signup=async(req, res)=>{
    try{
        let {username, email, password, address, phoneNumber ,role}=req.body;

        const existing=await Customer.findOne({ $or: [{ username }, { email }] });
        if (existing){
            return res.status(400).json({message: 'User already exists'});
        }

        const newCustomer=new Customer({
            username,
            email,
            password,
            role,
            address,
            phoneNumber,
        });

        await newCustomer.save();
        res.status(201).json({message: 'Customer created successfully'});

    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Sign up failed'})
    }
}

//login user
exports.login=async(req, res)=>{
    try{
        const {username, password}=req.body;

        const customer=await Customer.findOne({ username });

        if (!customer){
            return res.status(401).json({message: 'User not Found'});
        }

        if (customer.password!==password){
            return res.status(401).json({message: 'Incorrect password'});
        }

        if (customer.status==='blocked'){
            return res.status(401).json({message: 'User is blocked'});
        }

        const token=jwt.sign({
            username:customer.username, 
            userid:customer._id, 
            role:customer.role
        }, process.env.SECRET_KEY);

        res.status(200).json({
            message: 'Login Successful',
            token,
            username:customer.username,
            userid:customer._id
        });

    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Login failed'})
    }
}

//update username
exports.update_username=async(req, res)=>{
    const token=req.token

    if (!token){
        return res.status(401).json({message:'Token not found'})
    }

    try{
        await Customer.findByIdAndUpdate(token.userid, {$set: {username:req.body.username}})
        res.status(200).json({message:'Username updated successfully'})

    }catch(err){
        res.status(500).json({message: 'Error in updating username'})
    }
}

//update email
exports.update_email=async(req, res)=>{
    const token=req.token

    if (!token){
        return res.status(401).json({message:'Token not found'})
    }

    try{
        await Customer.findByIdAndUpdate(token.userid, {$set: {email:req.body.email}})
        res.status(200).json({message:'Email updated successfully'})

    }catch(err){
        res.status(500).json({message: 'Error in updating email'})
    }
}

//update password
exports.update_password=async(req, res)=>{
    const token=req.token

    if (!token){
        return res.status(401).json({message:'Token not found'})
    }

    try{
        await Customer.findByIdAndUpdate(token.userid, {$set: {password:req.body.password}})
        res.status(200).json({message:'Password updated successfully'})

    }catch(err){
        res.status(500).json({message: 'Error in updating password'})
    }
}

//add new address
exports.add_newaddress=async(req, res)=>{
    const token=req.token

    if (!token){
        return res.status(401).json({message:'Token not found'})
    }

    try{
        const customer=await Customer.findById({_id:token.userid});

        if (!customer){
            return res.status(404).json({message: 'User not found'});
        }

        customer.Address.push({
            address: req.body.address,
            city:req.body.city,
            country:req.body.country,
        });

        await customer.save();
        res.status(200).json({message:'New address added successfully'});

    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error in adding new address'});
    }
}

//update address
exports.update_address=async(req, res)=>{
    const token=req.token
    const addressID=req.params.id

    if (!token){
        return res.status(401).json({message:'Token not found'})
    }

    try{
        await Customer.findOneAndUpdate({"_id":token.userid, "Address._id":addressID}, { $set: { "Address.$":req.body } })
        res.status(200).json({message:'Address updated successfully'})

    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Error in updating address'})
    }
}

//update phone number
exports.update_phoneNumber=async(req, res)=>{
    const token=req.token

    if (!token){
        return res.status(401).json({message:'Token not found'})
    }

    try{
        await Customer.findByIdAndUpdate(token.userid, {$set: {phoneNumber:req.body.phoneNumber}})
        res.status(200).json({message:'Phone Number updated successfully'})

    }catch(err){
        res.status(500).json({message: 'Error in updating phone number'})
    }
}

//get profile
exports.getcustomer_profile=async(req, res)=>{
    const token=req.token;

    if (!token){
        return res.status(401).json({message:'Token not found'})
    }

    try{
        const profile=await Customer.findById({_id:token.userid})

        if (!profile){
            return res.status(404).json({message:'User not Found'})
        }

        res.status(200).json({profile})
    }catch(err){
        res.status(500).json({message: 'Error in getting user'})
    }
}

//add brand to follow
exports.follow_brand=async(req, res)=>{
    const brandId=req.params.id;

    const token=req.token

    if (!token){
        return res.status(401).json({message:'Token not found'})
    }

    try{
        //finding customer and brand
        const follower=await Customer.findById(token.userid);
        const brand=await Brand.findById(brandId);

        //Error handling
        if (!follower || !brand){
            return res.status(400).json({message: 'User or Brand not found'})
        }

        //making sure they are not already following each other
        if (follower.following.includes(brandId)){
            return res.status(400).json({message:'You are already following '+ brand.name})
        }

        //adding to customer folowing list
        follower.following.push(brandId);
        await follower.save();

        //adding to brand
        brand.followers.push(token.userid);
        await brand.save();
        res.status(200).json({message:'User successfullly follows brand'})
    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Error in following' + brandId})
    }
}

//unfollow supplier
exports.unfollow_brand=async (req, res)=>{
    const brandId=req.params.id;

    const token=req.token;

    if (!token){
        return res.status(401).json({message:'Token not found'});
    }

    try{
        //finding customer and brand
        const follower=await Customer.findById(token.userid);
        const brand=await Brand.findById(brandId);

        //Error handling
        if (!follower || !brand){
            return res.status(400).json({message: 'User or Brand not found'})
        }

        //seeing if you arent following them
        if (!follower.following.includes(brandId)){
            return res.status(400).json({message:'You are already not following '+ brand.name})
        }

        //removing brand from customers following list
        await Customer.findByIdAndUpdate(followerId, { $pull: { following: brandId } });

        //removing customer from brands follower list
        await Brand.findByIdAndUpdate(brandId, { $pull: { followers: token.userid } })

        res.status(200).json({message:'User successfullly unfollows brand'})

    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Error in unfollowing ' + brandId})
    }
}

//view notifications
exports.view_notification=async(req, res)=>{
    const token=req.token;

    if (!token){
        return res.status(401).json({message:'Token not found. You are not authorization to view notifications'});
    }

    try{
        const customer=await Customer.findById(token.userid)

        const notifications=customer.notification

        res.status(200).json({notifications})

    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Error in viewing notifications '})
    }
}

//view loyalty points
exports.get_loyaltyPoints=async(req, res)=>{
    const token=req.token;

    if (!token){
        return res.status(401).json({message:'Token not found. You are not authorization to view notifications'});
    }

    try{
        const customer=await Customer.findById(token.userid)

        const points=customer.loyaltyPoints;

        res.status(200).json({points})

    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Error in viewing Loyalty Point List'})
    }
}

//comment item
exports.comment_item=async(req, res)=>{
    const token=req.token;
    const productId=req.params.id;

    if (!token){
        return res.status(401).json({message:'Token not found. You are not authorization to comment'});
    }

    try{
        const product=await Product.findById(productId)

        if (!product){
            return res.status(400).json({message: 'Item not found'})
        }

        const comment={
            customer:token.userid,
            comment:req.body.comment
        }

        product.comments.push(comment)
        await product.save();
        res.status(200).json({message: 'Comment added successfully'});

    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Error in commenting'})
    }   
}

//rate item
exports.rate_item=async(req, res)=>{
    const token=req.token;
    const productId=req.params.id;

    if (!token){
        return res.status(401).json({message:'Token not found. You are not authorization to rate'});
    }

    try{
        const product=await Product.findById(productId)

        if (!product){
            return res.status(400).json({message: 'Item not found'})
        }

        const rate={
            customer:token.userid,
            rating:req.body.rating
        }

        product.ratings.push(rate)
        await product.save();
        res.status(200).json({message: 'Product Rated successfully'});

    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Error in rating'})
    }   
}

//view order history

//view wishlist

//add item to wishlist

//delete item from wishlist

//make order

//view order status