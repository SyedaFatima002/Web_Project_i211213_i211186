const Customer=require("../models/customer.Schema")
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
        res.status(404).json({message: 'Error in updating username'})
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
        res.status(404).json({message: 'Error in updating email'})
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
        res.status(404).json({message: 'Error in updating password'})
    }
}

//add new address
exports.add_newaddress=async(req, res)=>{
    const token=req.token

    if (!token){
        return res.status(401).json({message:'Token not found'})
    }


}

//update address
exports.update_address=async(req, res)=>{
    const token=req.token

    if (!token){
        return res.status(401).json({message:'Token not found'})
    }

    try{
        await Customer.findByIdAndUpdate(token.userid, {$set: {address:req.body.address}})
        res.status(200).json({message:'Address updated successfully'})

    }catch(err){
        res.status(404).json({message: 'Error in updating address'})
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
        res.status(404).json({message: 'Error in updating phone number'})
    }
}


//get profile

//add company to follow

//view order history

//view wishlist

//add item to wishlist

//delete item from wishlist

//view loyalty points

//follow supplier

//unfollow supplier

//view notifications

