const Customer=require("../models/customer.Schema")
const jwt=require("jsonwebtoken")

//create new customer
const signup=async(req, res)=>{
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
const login=async(req, res)=>{
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
        }, process.env.SECRET_KEY, { expiresIn:'5h' });

        res.status(200).json({
            message: 'Login Successful',
            token
        });

    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Login failed'})
    }
}




module.exports={
    signup, login
}