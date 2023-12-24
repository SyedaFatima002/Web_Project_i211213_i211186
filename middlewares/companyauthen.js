const jwt = require('jsonwebtoken');
const Delivery = require('../Models/Deliverycompany.schema');

const authenticateDelivery = async (req, res, next) => {
    // Extract the token from the request headers
    const token=req.headers.authorization;
    console.log('t oe: ',  token);
    console.log(req.headers); // Log the request headers

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        //const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETKEY);

        // Find the rider based on the decoded riderId
        const company = await Delivery.findOne({username: decoded.username});

        if (!company) {
            return res.status(401).json({ message: 'Invalid token: Company not found.' });
        }

        // Attach the rider to the request object for later use in the route
        req.company = company;
        req.role = 'admin';

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticateDelivery;
