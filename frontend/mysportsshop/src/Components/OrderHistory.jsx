import React from "react";
import '../CSS/profile.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useOrderHistory from "../Hooks/useOrderHistory";

function OrderHistory() {
    const { error, isError, isLoading, data } = useOrderHistory();
    console.log(data)
    return (
        <div>
            <Row style={{ padding: '3%' }}>
                <Col xs={4}></Col>
                <Col xs={6}><h5>Your Order History</h5></Col>
                <Col xs={2}></Col>
            </Row>
            {isError && <div>Sorry! Error whilst getting order history</div>}
            {isLoading && <div>Loading Order History</div>}
            {data &&
                data.orders.map((order, index) => (
                    <Container key={index} style={{ marginBottom: '10px', padding: '5px', borderBottom:'1px solid gray' }}>
                        <Row>
                            <Col><b>{index + 1}.Order #: </b>{order._id}</Col>
                            <Col><b>Status:</b>
                                {order.status === 'Not Delivered' && <span style={{ color: 'red' }}> Not Delivered</span>}
                                {order.status === 'On the Way' && <span style={{ color: 'blue' }}> On the Way</span>}
                                {order.status === 'Delivered' && <span style={{ color: 'green' }}> Not Delivered</span>}
                            </Col>
                        </Row>
                        <Row style={{borderBottom:'1px solid lightgray'}}>
                            <Col><b>Payment Method:</b> {order.paymentMethod}</Col>
                            <Col><b>Total Payable: </b>${order.AmountDisc}</Col>
                        </Row>
                        {order.products &&
                            (
                                order.products.map((item, ind) => {
                                    return (
                                        <Container key={ind}>
                                            <Row>
                                                <Col xs={7}>
                                                    <b>Product Name: </b>{item.productname}
                                                </Col>
                                                <Col>
                                                    {item.quantity} x ${item.unitprice}
                                                </Col>
                                            </Row>
                                        </Container>
                                    )
                                })
                            )}
                    </Container>
                ))}
        </div>
    );
}

export default OrderHistory;