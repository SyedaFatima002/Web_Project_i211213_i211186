const jwt=require("jsonwebtoken")

const authCustomer=(req, res, next)=>{
    const token=req.headers.authorization;

    if (!token){
        return res.status(401).json({message: 'Token not found. Access denied'})
    }

    try{
        let decodedToken=jwt.verify(token, process.env.SECRET_KEY);
        req.token=decodedToken;
        next();
    }catch(err){
        return res.status(401).json({message: 'Error in getting token'})
    }
}

module.exports={authCustomer};