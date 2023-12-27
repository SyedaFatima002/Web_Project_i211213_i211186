import React, { useState } from 'react';
import Background from '../Components/Background';
import usePage from '../Hooks/usePage';
import Card from 'react-bootstrap/Card';
import Logo from '../Assets/logo.png';
import '../CSS/login.css'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useMutation } from '@tanstack/react-query';
import { register } from '../ApiCalls/register';

function Register() {
    const setPage = usePage((state) => state.setPage);

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [Address, setAdd] = useState();
    const [phone, setPhone] = useState();
    const [confirm, setConfirm] = useState();
    const [City, setCity]=useState();
    const [Country, setCountry]=useState();
    const [ErrorMessage, setErrorMessgae] = useState("");


    const createUserMutation = useMutation({
        mutationFn: (user) => register(user.username, user.email, user.password, user.address, user.phoneNumber)
    })

    const handleRegister = () => {
        if (confirm === password) {
            const add={
                address:Address,
                city:City,
                country:Country
            }

            createUserMutation.mutate({
                username:username,
                email:email,
                password:password,
                role:'user',
                Address:add,
                phoneNumber:phone
            }, {
                onSucess: (data) => {
                    setPage('Login')
                }
            })
        }
        else {
            setErrorMessgae('Confirm Password and Password need to be same')
        }

    }

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
                                    <Form.Control type="username" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Control placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridPassword">
                                <Form.Control type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridConfirmPassword">
                                <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirm(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridAddress">
                                <Form.Control placeholder="Enter Address" onChange={(e) => setAdd(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridCity">
                                <Form.Control placeholder="Enter City" onChange={(e) => setCity(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridCountry">
                                <Form.Control placeholder="Enter Country" onChange={(e) => setCountry(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridPhone">
                                <Form.Control placeholder="Enter Phone Number" onChange={(e) => setPhone(e.target.value)} />
                            </Form.Group>

                            <p style={{ color: "red", textAlign: "center", fontSize: "10px" }}>{ErrorMessage}</p>
                            <Button variant="warning" type="submit" onClick={handleRegister}>
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