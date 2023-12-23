import React, { useState } from 'react';
import Background from '../Components/Background';
import usePage from '../Hooks/usePage';
import useUser from '../Hooks/useUser';
import Card from 'react-bootstrap/Card';
import Logo from '../Assets/logo.png';
import '../CSS/login.css'
import useLogin from '../Hooks/useLogin';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Register() {
    const setPage = usePage((state) => state.setPage);

    return (
        <Background>
            <div className="overlay-content">
                <Card className="text-center">
                    <Card.Header variant="top" >
                        <img
                            src={Logo} width={"90px"} height={"90px"}
                        />
                    </Card.Header>
                    <Card.Body className='cardpad'>
                        <Card.Title>Welcome to The Sports Shop</Card.Title>
                        <Card.Subtitle>Register and Continue Shopping</Card.Subtitle>
                        <Form className='textsize textbox'>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridUsername">
                                <Form.Control type="email" placeholder="Enter Username" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Control placeholder="Email" />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridPassword">
                                <Form.Control type="password" placeholder="Enter Password" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridPassword">
                                <Form.Control type="password" placeholder="Confirm Password" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridAddress">
                                <Form.Control placeholder="Enter Address" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridPhone">
                                <Form.Control placeholder="Enter Phone Number" />
                            </Form.Group>

                            <Button variant="warning" type="submit">
                                Submit and Shop
                            </Button>
                            </Form>
                    </Card.Body>
                </Card>
            </div>
            <p className='returnHome' onClick={() => setPage('HomePage')}>Return Home</p>
        </Background>
    )
}

export default Register