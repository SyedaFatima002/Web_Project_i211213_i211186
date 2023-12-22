const Delivery = require('../Models/Deliverycompany.schema')
const Rider = require ('../Models/Rider.schema')
const Order = require ('../Models/Order.schema')

const jwt = require('jsonwebtoken');

exports.riderLogin = async function (req, res) {
    const { email, password } = req.body;

    try {
        // Find the rider by email
        const rider = await Rider.findOne({ email }).populate('orders');

        // Check if the rider exists and the password is correct
        if (!rider || !(password == rider.password)) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Generate JWT token for authentication
        const token = jwt.sign({ riderId: rider.id , role:'rider'}, process.env.JWT_SECRET);

        res.status(200).json({ token, rider });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during rider login.' });
    }
};

exports.viewRiderOrders = async function (req, res) {
    const riderId = req.params.riderId;

    try {
        const orders = await Order.find({ 'rider': riderId });

        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching rider orders.' });
    }
};

exports.changeOrderStatus = async function (req, res) {
    const riderId = req.params.riderId;
    const orderId = req.params.orderId;
    const newStatus = req.body.status;

    try {
        // Find the order and update its status
        const company = await Delivery.findOne({ username: companyUser }).populate({
            path: 'riders',
            match: { id: riderId },
            select: '-password'
        });

        if (!company) {
            return res.status(404).json({ message: 'Company not found.' });
        }

        const rider = company.riders.find(r => r.id == riderId);

        if (!rider) {
            return res.status(404).json({ message: 'Rider not found in the company.' });
        }

        const updatedOrder = rider.orders.find(o => o.order_number == orderId);
        updatedOrder.status = newStatus;

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found or not assigned to the rider.' });
        }

        // Generate notification logic here

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating order status.' });
    }
};
