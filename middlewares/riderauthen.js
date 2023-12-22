const jwt = require('jsonwebtoken');
const Rider = require('../models/Rider');

const authenticateRider = async (req, res, next) => {
    // Extract the token from the request headers
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the rider based on the decoded riderId
        const rider = await Rider.findById(decoded.riderId);

        if (!rider) {
            return res.status(401).json({ message: 'Invalid token: Rider not found.' });
        }

        // Attach the rider to the request object for later use in the route
        req.rider = rider;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticateRider;
