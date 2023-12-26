const Delivery = require('../Models/Deliverycompany.schema')
const Rider = require ('../Models/Rider.schema')
const Order = require ('../Models/Order.schema')
const { Types } = require('mongoose');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.companyLogin = async function (req, res) {
    const { email, password } = req.body;
    console.log("email", email, "password: ", password);

    try {
        // Find the company by email
        const company = await Delivery.findOne({ email }).populate('riders', '-password');

        // Check if the company exists and the password is correct
        if (!company || !(password == company.password)) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Check if the SECRETKEY is available
        if (!process.env.SECRETKEY) {
            return res.status(500).json({ message: 'Internal server error: Secret key not provided.' });
        }

        // Generate JWT token for authentication
        const token = jwt.sign({ role: 'deliveryadmin' }, process.env.SECRETKEY);
        res.status(200).json({ token, company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during company login.' });
    }
};


exports.createCompany = async function (req, res) {
    console.log(req.body);
    username = process.env.username;
    email = process.env.email;
    password = process.env.password;
    try {
        const newCompany ="company"// await Delivery.create({ username, email, password });

        res.status(201).json(newCompany);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating a new company.' });
    }
};

exports.createNewRider = async function (req, res) {
    console.log(req.body);
    console.log(req.headers);
    // id = req.body;
    // email = req.body;
    // password = req.body;
    // namee = req.body;
    // phone_number = req.body;
    // address = req.body;
    const {  id, email, password, name, phone_number, address } = req.body;

    try {
        const newRider = await Rider.create({ id, email, password, name, phone_number, address });
        
        // Add the newly created rider to the company's rider list
        const companyUsername = process.env.username;
        const company = await Delivery.findOneAndUpdate({ username: companyUsername }, { $push: { riders: newRider._id } }, { new: true });

        res.status(201).json({ rider: newRider, company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating a new rider.' });
    }
};

exports.newOrder = async function (req, res){
    const {location, deliverydate, status, client_phone, order_number} = req.body;
    // Validate the status against the enum values
    if (!['At Warehouse', 'Pickedup by Delivery', 'Sent by Rider', 'Delivered', 'Canceled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status.' });
    }

    //enum: ['At Warehouse', 'Pickedup by Delivery', 'Sent by Rider', 'Delivered', 'Canceled'],
    try{
        const newOrder = await Order.create({location, deliverydate, status, client_phone, order_number});
        const companyUsername = process.env.username;
        const company = await Delivery.findOneAndUpdate({ username: companyUsername }, { $push: { orders: newOrder._id } }, { new: true });
        res.status(201).json({ order: newOrder, company });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating a new order.' });
    }
};

exports.deleteRider = async function (req, res) {
    const riderId = req.params.riderId;
    console.log('rider if: ', riderId);
    try {   
        //const deletedRider = await Rider.findByIdAndRemove(riderId);

        // Find the rider by ID and delete
        const deletedRider = await Rider.findOneAndDelete({id: riderId});

        // If rider is not found
       // const deletedRider = await Rider.findByIdAndDelete({id: riderId});
        console.log('rideR: ',deletedRider);

        if (!deletedRider) {
            return res.status(404).json({ message: 'Rider not found.' });
        }

        // Remove the rider from the company's rider list
        // const companyUser = process.env.username;
        // const company = await Delivery.findOneAndUpdate(
        //     { username: companyUser },
        //     { $pull: { riders: _id } },
        //     { new: true }
        // );

        // if (!company) {
        //     return res.status(404).json({ message: 'Company not found or rider not in the list.' });
        // }

        res.status(200).json({ rider: deletedRider});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting the rider.' });
    }
};


exports.showCompanyRiders = async function (req, res) {
    const companyUser = process.env.username;
    try {
        const company = await Delivery.findOne({username: companyUser}).populate('riders', '-password');
        if (!company) {
            return res.status(404).json({ message: 'Company not found.' });
        }

        res.status(200).json(company.riders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching company riders.' });
    }
};

// exports.showCompanyOrders = async function (req, res) {
//     const companyUser = process.env.username;
//     try {
//         const company = await Delivery.findOne({username: companyUser}).populate('orders');
//         if (!company) {
//             return res.status(404).json({ message: 'Company not found.' });
//         }
//         res.status(200).json(company.orders);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching orders.' });
//     }
// };
exports.showCompanyOrders = async function (req, res) {
    const companyUser = process.env.username;
    try {
        const company = await Delivery.findOne({ username: companyUser }).populate('orders');
        
        if (!company) {
            return res.status(404).json({ message: 'Company not found.' });
        }

        // Populate orders for each order in the company's orders array
        const populatedOrders = company.orders;

        console.log("orders: ", populatedOrders);
        res.status(200).json(populatedOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching orders.' });
    }
};

exports.viewRiderOrders = async function (req, res){
    const riderId = req.params.riderId;
    try{
        const rider = await Rider.findOne({ id: riderId }).populate('orders');

        if(!rider){
            return res.status (404).json({message:'rider not found'});
        }

        const orders = rider.orders;
        if(!orders){
            return res.status(200).json({message : 'Rider has no orders'});
        }
        res.status(200).json(orders);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error fetching rider orders.' });
    }
};


exports.showCompanyRider = async function (req, res) {
    const companyUser = process.env.username;
    const riderId = req.params.id;
    //console.log('Company User:', companyUser);
    //console.log('Rider ID:', riderId);

    try {
       // const rider = await Rider.findOne({id: riderId}).populate({path: 'orders, match:{or}'});
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

        res.status(200).json(rider);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching company rider.' });
    }
};

// exports.assignOrdersToRider = async function (req, res) {
//     const riderId = req.params.riderId;
//     const { orderId } = req.body;

//     try {
//         const updatedRider = await Rider.findByIdAndUpdate(riderId, { $push: { orders: { $each: orderIds } } }, { new: true });

//         res.status(200).json(updatedRider);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error assigning orders to the rider.' });
//     }
// };
exports.assignOrdersToRider = async (req, res) => {
    try {
      const { orderNumber } = req.params;
      const { riderId } = req.body;
  
      // Validate riderId if needed
  
      // Find the order by order number
      const order = await Order.findOne({ order_number: orderNumber });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
      }
  
      order.assigned = true;
      console.log("order: ", order);
      // Update the order with the assigned rider
    //   order.rider = riderId;
    //   await order.save();
  
      // Optionally, update the rider's orders list
      const rider = await Rider.findOne({id: riderId});
      if (rider) {
        rider.orders.push(order._id);
        await rider.save();
      }
  
      res.status(200).json({ message: 'Order assigned successfully.' });
    } catch (error) {
      console.error('Error assigning order:', error);
      res.status(500).json({ message: 'Error assigning order.' });
    }
  };

exports.removeOrdersFromRider = async function (req, res) {
    const riderId = req.params.riderId;
    const { orderIds } = req.body;

    try {
        // Remove the specified orders from the rider's orders
        const updatedRider = await Rider.findByIdAndUpdate(riderId, { $pull: { orders: { $in: orderIds } } }, { new: true });

        // Update the status of the removed orders to 'Canceled'
        const updatedOrders = await Order.updateMany({ _id: { $in: orderIds } }, { status: 'Canceled' });

        res.status(200).json({ updatedRider, updatedOrders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing orders from the rider.' });
    }
};

exports.cancelOrders = async function (req, res) {
    const orderId = req.params.orderId;

    try {
        const canceledOrder = await Order.findOneAndRemove(orderId);

        // Remove the order from the associated rider's orders
        const riderId = canceledOrder.rider;  // Assuming 'rider' is the field in Order schema referencing Rider
        const updatedRider = await Rider.findByIdAndUpdate(riderId, { $pull: { orders: orderId } }, { new: true });

        res.status(200).json({ canceledOrder, updatedRider });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error canceling the order.' });
    }
};



// exports.assignOrdersToRider = async function (req, res) {
//     const riderId = req.params.riderId;
//     const { orderIds } = req.body;

//     try {
//         // Fetch the current number of orders assigned to the rider
//         const currentRider = await Rider.findById(riderId);
//         const currentOrderCount = currentRider.orders.length;

//         // Check if the new orders will exceed the maximum allowed (e.g., 10)
//         const newOrderCount = currentOrderCount + orderIds.length;
//         if (newOrderCount > 10) {
//             return res.status(400).json({ message: 'Rider cannot have more than 10 orders at a time.' });
//         }

//         // Update the rider's orders
//         const updatedRider = await Rider.findByIdAndUpdate(riderId, { $push: { orders: { $each: orderIds } } }, { new: true });

//         res.status(200).json(updatedRider);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error assigning orders to the rider.' });
//     }
// };

exports.listAllOrders = async function (req, res) {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching orders.' });
    }
};

exports.viewOrderByOrderNumber = async function (req, res) {
    const orderNumber = req.params.orderNumber;
    console.log("ofer: ", orderNumber);
    try {
        const order = await Order.findOne({ order_number: orderNumber });
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching the order.' });
    }
};

exports.listRiderOrders = async function (req, res) {
    const riderId = req.params.riderId;

    try {
        const rider = await Rider.findById({id:riderId}).populate('orders');
        if (!rider) {
            return res.status(404).json({ message: 'Rider not found.' });
        }

        res.status(200).json(rider.orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching rider orders.' });
    }
};


exports.listAllOrders = async function (req, res) {
    try {
        const orders = await Blog.find().populate('owner', 'username').lean();
        const formattedBlogs = blogs.map(blog => ({
            title: blog.title,
            author: blog.owner.username,
            creationDate: blog.createdAt,
            averageRating: calculateAverageRating(blog.ratings),
        }));

        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching orders.' });
    }
};

exports.viewOrder = async function (req, res) {
    const orderId = req.params.id;

    try {
        const order = await Order.findById(orderId).populate('owner', 'username').lean();
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }
        res.status(200).json(blog);
    } catch (error) {
        console.error(error);
        if (error.name === 'CastError') {
            return res.status(404).json({ message: 'Blog not found.' });
        }
        res.status(500).json({ message: 'Error fetching blog post.' });
    }
};
