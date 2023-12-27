const Delivery = require('../Models/Deliverycompany.schema')
const Rider = require ('../Models/Rider.schema')
const Order = require ('../Models/Order.schema')
const jwt = require('jsonwebtoken');

exports.riderLogin = async function (req, res) {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        // Find the rider by email
        const rider = await Rider.findOne({ email : email }).populate('orders');
        console.log(rider);
        // Check if the rider exists and the password is correct
        if (!rider || !(password == rider.password)) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Generate JWT token for authentication
        const token = jwt.sign({ riderId: rider.id , role:'rider'}, process.env.SECRETKEY);
        res.status(200).json({ token, rider });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during rider login.' });
    }
};

exports.viewRiderOrders = async function (req, res) {
    const riderId = req.params.riderId;
    console.log(riderId);
    try {
        const rider = await Rider.findOne({id: riderId}).populate('orders');
        if(!rider)
        {
            res.status(400).json({ message: 'Error fetching rider.' });   
        }
        const orders = rider.orders;
    
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching rider orders.' });
    }
};

exports.viewRiderOrder = async function (req, res){
    const orderId = req.params.orderId;
    console.log('id: ',orderId);
    try {
        const order = await Order.findOne({order_number: orderId});
        console.log('order: ', order);
        if(!order)
        {
            res.status(400).json({ message: 'Error fetching order.' });   
        }else{
            res.status(200).json(order);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching Order.' });
    }
};

exports.changeOrderStatus = async function (req, res) {
    const orderId = req.params.orderId;
    const newStatus = req.body.status;
    const riderId = req.rider.id;

    try {
        // Find the order and update its status
        const rider = await Rider.findOne({ id: riderId }).populate('orders');

        if (!rider) {
            return res.status(404).json({ message: 'rider not found.' });
        }

        const order = rider.orders.find(o => o.order_number == orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found in the Rider.' });
        }
        order.status = newStatus;

        // Save the updated order
        await order.save();
        // Generate notification logic here

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating order status.' });
    }
};
