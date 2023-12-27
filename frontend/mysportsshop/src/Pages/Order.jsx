import useCart from "../Hooks/useCart"
import NavBar from "../Components/NavBar"
import useLogin from "../Hooks/useLogin";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import '../CSS/order.css'
import '../CSS/cart.css';
import { Container, Row, Col, Button } from "react-bootstrap";
import useProfile from "../Hooks/useProfile";
import { useEffect, useState } from "react";
import usePage from "../Hooks/usePage";
import useLoyalty from "../Hooks/useLoyalty";
import { useMutation } from '@tanstack/react-query';
import { placeOrder } from '../ApiCalls/setOrder'
import useUser from "../Hooks/useUser";



function BillingLoggedIn({ customer, setCustomer }) {
    const { error, isError, isLoading, data } = useProfile();

    const handleInputChange = (field, value) => {
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [field]: value
        }));
    };

    useEffect(() => {
        if (data) {
            setCustomer((prevCustomer) => ({
                ...prevCustomer,
                name: data.username || "",
                email: data.email || "",
                phone: data.phoneNumber || "",
                address: data.Address && data.Address[0] ? data.Address[0].address || "" : "",
                city: data.Address && data.Address[0] ? data.Address[0].city || "" : "",
                country: data.Address && data.Address[0] ? data.Address[0].country || "" : ""
            }))
        }

    }, [data])
    return (
        <>
            <div style={{ margin: '3%', textAlign: 'center' }}>
                <h3>Billing Details</h3>
            </div>
            <Form style={{ margin: '3%' }}>
                <InputGroup className="mb-3 size" style={{ margin: '2%' }}>
                    <InputGroup.Text id="basic-addon1" className="color">Name</InputGroup.Text>
                    <Form.Control
                        defaultValue={data && data.username ? data.username : ""}
                        placeholder="Recipient's Name"
                        aria-label="Recipient's name"
                        aria-describedby="basic-addon1"
                        onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="mb-3 size" style={{ margin: '2%' }}>
                    <InputGroup.Text id="basic-addon2" className="color">Phone Number</InputGroup.Text>
                    <Form.Control
                        defaultValue={data && data.phoneNumber ? data.phoneNumber : ""}
                        placeholder="Recipient's Phone Number"
                        aria-label="Recipient's phoneNum"
                        aria-describedby="basic-addon2"
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="mb-3 size" style={{ margin: '2%' }}>
                    <InputGroup.Text id="basic-addon3" className="color">Email</InputGroup.Text>
                    <Form.Control
                        defaultValue={data && data.email ? data.email : ""}
                        placeholder="Recipient's Phone Email"
                        aria-label="Recipient's email"
                        aria-describedby="basic-addon3"
                        onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="mb-3 " style={{ margin: '2%' }}>
                    <InputGroup.Text id="basic-addon4" className="color">Street Addr</InputGroup.Text>
                    <Form.Control
                        defaultValue={data && data.Address[0] ? data.Address[0].address : ""}
                        placeholder="Street Address"
                        aria-label="Recipient's address"
                        aria-describedby="basic-addon4"
                        onChange={(e) => handleInputChange("address", e.target.value)}
                    />

                    <InputGroup.Text id="basic-addon5" className="color">City</InputGroup.Text>
                    <Form.Control
                        defaultValue={data && data.Address[0] ? data.Address[0].city : ""}
                        placeholder="City"
                        aria-label="Recipient's city"
                        aria-describedby="basic-addon5"
                        onChange={(e) => handleInputChange("city", e.target.value)}
                    />

                    <InputGroup.Text id="basic-addon6" className="color">Country</InputGroup.Text>
                    <Form.Control
                        defaultValue={data && data.Address[0] ? data.Address[0].country : ""}
                        placeholder="Country"
                        aria-label="Recipient's county"
                        aria-describedby="basic-addon6"
                        onChange={(e) => handleInputChange("country", e.target.value)}
                    />
                </InputGroup>
            </Form>
        </>
    );
}

function BillingDetails({ customer, setCustomer }) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAdd] = useState();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();

    useEffect(() => {
        const updatedCustomer = {
            name: name || "",
            email: email || "",
            phone: phone || "",
            address: address || "",
            city: city || "",
            country: country || ""
        };


        setCustomer(updatedCustomer);

    }, [name, email, phone, address, city, country])

    return (
        <>
            <div style={{ margin: '3%', textAlign: 'center' }}>
                <h3>Billing Details</h3>
            </div>
            <Form style={{ margin: '3%' }}>
                <InputGroup className="mb-3 size" style={{ margin: '2%' }}>
                    <InputGroup.Text id="basic-addon1" className="color">Name</InputGroup.Text>
                    <Form.Control
                        placeholder="Recipient's Name"
                        aria-label="Recipient's name"
                        aria-describedby="basic-addon1"
                        onChange={(e) => setName(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="mb-3 size" style={{ margin: '2%' }}>
                    <InputGroup.Text id="basic-addon2" className="color">Phone Number</InputGroup.Text>
                    <Form.Control
                        placeholder="Recipient's Phone Number"
                        aria-label="Recipient's phoneNum"
                        aria-describedby="basic-addon2"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="mb-3 size" style={{ margin: '2%' }}>
                    <InputGroup.Text id="basic-addon3" className="color">Email</InputGroup.Text>
                    <Form.Control
                        placeholder="Recipient's Phone Email"
                        aria-label="Recipient's email"
                        aria-describedby="basic-addon3"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className="mb-3 " style={{ margin: '2%' }}>
                    <InputGroup.Text id="basic-addon4" className="color">Street Addr</InputGroup.Text>
                    <Form.Control
                        placeholder="Street Address"
                        aria-label="Recipient's address"
                        aria-describedby="basic-addon4"
                        onChange={(e) => setAdd(e.target.value)}
                    />

                    <InputGroup.Text id="basic-addon5" className="color">City</InputGroup.Text>
                    <Form.Control
                        placeholder="City"
                        aria-label="Recipient's city"
                        aria-describedby="basic-addon5"
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <InputGroup.Text id="basic-addon6" className="color">Country</InputGroup.Text>
                    <Form.Control
                        placeholder="Country"
                        aria-label="Recipient's county"
                        aria-describedby="basic-addon6"
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </InputGroup>
            </Form>
        </>
    );
}

function OrderDetails() {
    const { products } = useCart();
    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>Your Order</h3>
            {products && products.length > 0 &&
                (products.map((item, index) => {
                    return (
                        <Container className="titleborder" key={index}>
                            <Row>
                                <Col>
                                    <img alt={index}
                                        src={item.image}
                                        width="90px"
                                    />
                                </Col>
                                <Col xs={7}>
                                    <b>{item.productname}</b><br></br>
                                    {item.quantity} x ${item.unitprice}<br></br>
                                </Col>
                                <Col>
                                    <p><b>Color: </b><span>{item.options[0]}</span></p>
                                    <p><b>Size: </b><span>{item.options[1]}</span></p>
                                </Col>
                            </Row>
                        </Container>
                    );
                }))
            }
        </div>
    );
}

function Billing() {
    const { totalAmount, AmountDisc } = useCart();

    return (
        <div style={{ textAlign: 'center', paddingBottom: '4%' }}>
            <div className="d-grid gap-2 payment">
                <Row>
                    <Col>
                        <h3>Your Final Bill</h3>
                    </Col>
                </Row>
                <Row>
                    <Col><b>SubTotal:</b></Col>
                    <Col>{totalAmount}</Col>
                </Row>
                <Row>
                    <Col><b>Discount Applied:</b></Col>
                    <Col>{totalAmount - AmountDisc}</Col>
                </Row>
                <Row>
                    <Col><b>Payable Total:</b></Col>
                    <Col>{AmountDisc}</Col>
                </Row>
            </div>
        </div>
    );
}

function Payment({ customer }) {
    const { paymentMethod, products, totalAmount, AmountDisc, order } = useCart();
    const { setPage } = usePage();
    const { login } = useLogin();
    const { token } = useUser();

    const { error, isError, isLoading, data } = useLoyalty(token);

    const loyaltyMutation = useMutation({
        mutationFn: async (order) => {
            try {
                const result = await placeOrder(
                    order.token,
                    {
                        name: order.customer.name,
                        email: order.customer.email,
                        phone: order.customer.phone,
                        address: order.customer.address || "",
                        city: order.customer.city || "",
                        country: order.customer.country || ""
                    },
                    order.products,
                    order.paymentMethod,
                    order.totalAmount,
                    order.AmountDisc
                );
                console.log(result)
                return result;
            } catch (error) {
                console.error('Error making order:', error);
                throw error;
            }
        }
    });

    const handlePayment = (e) => {
        e.preventDefault();
        const orderData = {
            token: token,
            customer: customer,
            products: products,
            paymentMethod: paymentMethod,
            totalAmount: totalAmount,
            AmountDisc: AmountDisc
        };
        
        loyaltyMutation.mutate(
            orderData,

            {
                onSuccess: (data) => {
                    console.log(data);
                    alert('Order made');
                    //order();
                    
                }, onError: (error) => {
                    console.error('Order placement failed:', error);

                },
            });
        setPage('PaymentDisplay');
    };

    const handleRedeem = () => {

    }



    return (
        <>
            {paymentMethod == 'cash on delivery' &&
                <div style={{ marginBottom: '2%' }}><b>Payment Method:</b> {paymentMethod}</div>
            }

            {login && data &&
                (
                    <div>
                        <div>You have {data.points} Loyalty Points
                            {data.points > 0 && (
                                <Button variant="warning">Redeem Points</Button>
                            )}
                        </div>
                    </div>
                )
            }

            <div className="d-grid gap-2">
                <Button variant="outline-warning" size="lg" onClick={(e) => handlePayment(e)}>Place Order</Button>
            </div>
        </>
    );
}

function Order() {
    const { login } = useLogin();

    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: ""
    })

    return (
        <>
            <NavBar />
            <div style={{
                textAlign: 'center',
                margin: '3%',
                borderBottom: '2px solid rgb(150, 1, 1)'
            }}>
                <h1>Welcome to CheckOut</h1>
            </div>
            <div style={{ borderBottom: '2px solid rgb(150, 1, 1)', margin: '2%' }}>
                {login && <BillingLoggedIn customer={customer} setCustomer={setCustomer} />}
                {!login && <BillingDetails customer={customer} setCustomer={setCustomer} />}
            </div>
            <div style={{ margin: '4%', borderBottom: '2px solid rgb(150, 1, 1)' }}>
                <OrderDetails />
            </div>
            <div style={{ margin: '4%', borderBottom: '2px solid rgb(150, 1, 1)' }}>
                <Billing />
            </div>
            <div style={{ margin: '4%', borderBottom: '2px solid rgb(150, 1, 1)' }}>
                <Payment customer={customer} />
            </div>

        </>
    )
}

export default Order