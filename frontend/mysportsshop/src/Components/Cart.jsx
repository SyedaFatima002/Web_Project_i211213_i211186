import useCart from "../Hooks/useCart";
import { useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import cart from '../Assets/cart.svg'

function Cart() {
    const [show, setShow] = useState(false);
    const {items}=useCart();

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
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Your Cart: Items {items}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>

        </>
    );

}

export default Cart;