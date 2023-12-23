import React from 'react';
import Background from '../Components/Background';
import usePage from '../Hooks/usePage';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Logo from '../Assets/logo.png';
import '../CSS/login.css'
import { Button } from 'react-bootstrap';


function Login(){
    const setPage = usePage((state) => state.setPage);

    return(
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
                        <Card.Subtitle>Login and Continue Shopping</Card.Subtitle>
                        <Form.Control
                            type="textbox"
                            placeholder='Enter Username'
                            className='textbox'
                        />
                        <Form.Control
                            type="password"
                            placeholder='Enter Password'
                            className='textbox'
                        />

                        <Card.Text className='forget'>Forgot Password?</Card.Text>

                        <Button variant="warning">Login and Shop</Button>
                    
                    </Card.Body>
                </Card>
                <p className='returnHome' onClick={()=>setPage('HomePage')}>Return Home</p>
            </div>
        </Background>
    );
}

export default Login;