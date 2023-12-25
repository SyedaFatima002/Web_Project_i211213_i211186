import useCart from "../Hooks/useCart";
import { useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import cart from '../Assets/cart.svg'
import '../CSS/cart.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function DisplayItem() {
    const { products, updateQuantity } = useCart();
    const [quantity, setQuantity] = useState(1);

    console.log(products)
    return (
        <>
            {products && products.length>0 && 
            (products.map((item, index)=>{
                return (
                  <Container className="titleborder" key={index}>
                    <Row>
                        <Col ></Col>
                        <Col>
                            <img alt={index}
                                src={item.image}
                                width="80px"
                                height="80px"/>
                        </Col>
                        <Col xs={7}>
                            {item.productname}<br></br>
                            {item.quantity} x ${item.unitprice}
                        </Col>
                        <Col>
                            
                        </Col>
                    </Row>
                  </Container>
                );
            }))
            }
        </>
    );
}



function Cart() {
    const [show, setShow] = useState(false);
    const { items } = useCart();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <img
                alt='Cart'
                src={cart}
                onClick={handleShow}
                className="me-2"
            />

            <Offcanvas show={show} onHide={handleClose} placement={'end'} name={'end'}>
                <Offcanvas.Header closeButton className="titleborder">
                    <Offcanvas.Title>Your Cart ({items} Items)</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <DisplayItem />

                </Offcanvas.Body>
            </Offcanvas>

        </>
    );

}

export default Cart;