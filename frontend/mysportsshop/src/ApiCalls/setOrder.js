import axios from 'axios';

export async function placeOrder(token, customer, products, paymentMethod, totalAmount, AmountDisc) {
    try {
        const formattedCustomer = {
            name: customer.name || "",
            email: customer.email || "",
            phone: customer.phone || "",
            address: customer.address || "",
            city: customer.city || "",
            country: customer.country || ""
        };

        const response = await axios.post(`http://localhost:3001/order/order`, {
            customer: formattedCustomer,
            products: products,
            totalAmount: totalAmount,
            AmountDisc: AmountDisc,
            paymentMethod: paymentMethod,
            status: 'Not Delivered'
        });

        /*if (token) {
            const loyalty = await axios.post(`http://localhost:3001/auth/loyaltyPoint`, {
                price: AmountDisc
            }, {
                headers: {
                    authorization: `${token}`,
                }
            });

            console.log(loyalty);
        }*/
        console.log('in place order')
        console.log(response);
        return response;

    } catch (err) {
        return err.response.data;
    }
}