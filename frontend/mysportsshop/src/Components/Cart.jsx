import useCart from "../Hooks/useCart";
import { useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import cart from '../Assets/cart.svg'
import '../CSS/cart.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import trash from '../Assets/trash.svg';
import { Button } from "react-bootstrap";
import usePage from '../Hooks/usePage';

function DisplayItem() {
    const { products, removeFromCart } = useCart();

    console.log(products)
    return (
        <>
            {products && products.length > 0 &&
                (products.map((item, index) => {
                    return (
                        <Container className="titleborder" key={index}>
                            <Row>
                                <Col>
                                    <img alt={index}
                                        src={item.image}
                                        width="80px"
                                    />
                                </Col>
                                <Col xs={7}>
                                    <b>{item.productname}</b><br></br>
                                    {item.quantity} x ${item.unitprice}<br></br>
                                </Col>
                                <Col>
                                    <img alt="del"
                                        src={trash}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => removeFromCart(item.productID)} />
                                </Col>
                            </Row>
                        </Container>
                    );
                }))
            }
        </>
    );
}

function Payment() {
    const { totalAmount, AmountDisc, paymentMethod, updatePaymentMethod } = useCart();
    const [check, setPay]=useState('cash');
    const {currentPage, setPage}=usePage();

    const handleCash=()=>{
        setPay('cash')
        updatePaymentMethod('cash on delivery')
    }

    const handleCard=()=>{
        setPay('card')
        updatePaymentMethod('Credit Card')
    }

    const PageChange=()=>{
        setPage('Order')
    }

    return (
        <div className="flex1">
            <div className="d-grid gap-2">
                <Button variant="outline-warning" size="sm" active={check==='cash'} onClick={handleCash}>
                    Pay with Cash
                </Button>
                <Button variant="outline-dark" size="sm" active={check==='card'} onClick={handleCard}>
                    Pay with Credit
                </Button>
            </div>
            <div className="d-grid gap-2 payment">
                <Row>
                    <Col><b>SubTotal:</b></Col>
                    <Col>{totalAmount}</Col>
                </Row>
                <Row>
                    <Col><b>Discount Applied:</b></Col>
                    <Col>{totalAmount-AmountDisc}</Col>
                </Row>
                <Row>
                    <Col><b>Payable Total:</b></Col>
                    <Col>{AmountDisc}</Col>
                </Row>
                <Button variant="dark" onClick={PageChange} active={currentPage!=='Order'}>
                    Checkout
                </Button>
            </div>
        </div>
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
                    <Payment />
                </Offcanvas.Body>
            </Offcanvas>

        </>
    );

}

export default Cart;