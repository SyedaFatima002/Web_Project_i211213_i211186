const Delivery = require('../Models/Deliverycompany.schema')
const Rider = require ('../Models/Rider.schema')
const Order = require ('../Models/Order.schema')

exports.createNewRider = async function (req, res) {
    const { id, email, password, name, phone_number, address } = req.body;

    try {
        const newRider = await Rider.create({ id, email, password, name, phone_number, address });
        
        // Add the newly created rider to the company's rider list
        const companyUsername = req.params.companyUsername;  // Assuming companyUsername is passed in the request
        const company = await Delivery.findOneAndUpdate({ username: companyUsername }, { $push: { riders: newRider._id } }, { new: true });

        res.status(201).json({ rider: newRider, company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating a new rider.' });
    }
};

exports.deleteRider = async function (req, res) {
    const riderId = req.params.riderId;

    try {
        const deletedRider = await Rider.findByIdAndRemove(riderId);

        // Remove the rider from the company's rider list
        const companyUser = req.params.companyUsername;  // Assuming companyId is passed in the request
        const company = await Delivery.findOneAndUpdate(companyUser, { $pull: { riders: riderId } }, { new: true });

        res.status(200).json({ rider: deletedRider, company });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting the rider.' });
    }
};

exports.showCompanyRiders = async function (req, res) {
    const companyUser = req.params.companyUsername;  // Assuming companyId is passed in the request

    try {
        const company = await Delivery.findOne(companyUser).populate('riders', '-password');
        if (!company) {
            return res.status(404).json({ message: 'Company not found.' });
        }

        res.status(200).json(company.riders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching company riders.' });
    }
};

exports.assignOrdersToRider = async function (req, res) {
    const riderId = req.params.riderId;
    const { orderIds } = req.body;

    try {
        const updatedRider = await Rider.findByIdAndUpdate(riderId, { $push: { orders: { $each: orderIds } } }, { new: true });

        res.status(200).json(updatedRider);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error assigning orders to the rider.' });
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
        const canceledOrder = await Order.findByIdAndRemove(orderId);

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
        const rider = await Rider.findById(riderId).populate('orders');
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

        res.status(200).json(formattedBlogs);
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
