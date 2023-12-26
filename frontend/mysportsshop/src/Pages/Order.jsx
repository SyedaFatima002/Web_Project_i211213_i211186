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

function BillingLoggedIn({ customer, setCustomer }) {
    const { error, isError, isLoading, data } = useProfile();

    useEffect(() => {
        if (data) {
            setCustomer((prevCustomer) => ({
                ...prevCustomer,
                name: data.username || "",
                email: data.email || "",
                phone: data.phoneNumber || "",
                address: data.Address[0].address || "",
                city: data.Address[0].city || "",
                country: data.Address[0].country || ""
            }))
        }

    }, [data, setCustomer])
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
                    />
                </InputGroup>

                <InputGroup className="mb-3 size" style={{ margin: '2%' }}>
                    <InputGroup.Text id="basic-addon2" className="color">Phone Number</InputGroup.Text>
                    <Form.Control
                        defaultValue={data && data.phoneNumber ? data.phoneNumber : ""}
                        placeholder="Recipient's Phone Number"
                        aria-label="Recipient's phoneNum"
                        aria-describedby="basic-addon2"
                    />
                </InputGroup>

                <InputGroup className="mb-3 size" style={{ margin: '2%' }}>
                    <InputGroup.Text id="basic-addon3" className="color">Email</InputGroup.Text>
                    <Form.Control
                        defaultValue={data && data.email ? data.email : ""}
                        placeholder="Recipient's Phone Email"
                        aria-label="Recipient's email"
                        aria-describedby="basic-addon3"
                    />
                </InputGroup>

                <InputGroup className="mb-3 " style={{ margin: '2%' }}>
                    <InputGroup.Text id="basic-addon4" className="color">Street Addr</InputGroup.Text>
                    <Form.Control
                        defaultValue={data && data.Address[0] ? data.Address[0].address : ""}
                        placeholder="Street Address"
                        aria-label="Recipient's address"
                        aria-describedby="basic-addon4"
                    />

                    <InputGroup.Text id="basic-addon5" className="color">City</InputGroup.Text>
                    <Form.Control
                        defaultValue={data && data.Address[0] ? data.Address[0].city : ""}
                        placeholder="City"
                        aria-label="Recipient's city"
                        aria-describedby="basic-addon5"
                    />

                    <InputGroup.Text id="basic-addon6" className="color">Country</InputGroup.Text>
                    <Form.Control
                        defaultValue={data && data.Address[0] ? data.Address[0].country : ""}
                        placeholder="Country"
                        aria-label="Recipient's county"
                        aria-describedby="basic-addon6"
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

    }, name, email, phone, address, city, country)

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
    const { paymentMethod, products, totalAmount, AmountDisc, status } = useCart();
    const { setPage } = usePage();

    const handlePayment = (e) => {
        setPage('PaymentDisplay')
    }

    return (
        <>
            {paymentMethod == 'cash on delivery' &&
                <div style={{ marginBottom: '2%' }}><b>Payment Method:</b> {paymentMethod}</div>
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