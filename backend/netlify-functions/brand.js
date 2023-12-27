//backend/netlify-functions/customer.js
const mongoose = require("mongoose");

exports.handler = async (event, context) => {
    try {
        // Perform some operation related to your customer route
        // For example, fetch customer data from your database
        const brands = await mongoose.model("brands").find();

        return {
            statusCode: 200,
            body: JSON.stringify(brands),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};