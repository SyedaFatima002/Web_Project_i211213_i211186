import React, { useState } from 'react';
import Background from '../Components/Background';
import usePage from '../Hooks/usePage';
import useUser from '../Hooks/useUser';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Logo from '../Assets/logo.png';
import '../CSS/login.css'
import { Button } from 'react-bootstrap';
import { LoginShop } from '../ApiCalls/login';
import { useMutation } from '@tanstack/react-query';
import useLogin from '../Hooks/useLogin';



function Login(){
    const [username, setUsername]=useState();
    const [password, setPassword]=useState();
    const [ErrorMessage, setErrorMessgae]=useState("");

    const setPage = usePage((state) => state.setPage);

    const setusername = useUser((state) => state.setusername);
    const setrole = useUser((state) => state.setrole);
    const settoken = useUser((state) => state.settoken);
    const setId= useUser((state)=> state.setId);
    const setLogin=useLogin((state)=>state.setLogin);
    

    const loginMutation=useMutation({
        mutationFn: (credentials)=>LoginShop(credentials.username, credentials.password)
    })

    const handleLogin=(e)=>{
        e.preventDefault();
        loginMutation.mutate({
            username,
            password
        }, {
            onSuccess: (data)=>{
                if (data.message.trim()==='Login Successful'){
                    console.log(data)
                    setusername(data.username)
                    setrole('user');
                    settoken(data.token);
                    setId(data.userid);
                    setLogin(true);
                    setPage('HomePage');
                }
                else{
                    setErrorMessgae(data.message)
                }

                
            }
        })
    }

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
                            onChange={(e)=> setUsername(e.target.value)}
                        />
                        <Form.Control
                            type="password"
                            placeholder='Enter Password'
                            className='textbox'
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <p style={{color:"red", textAlign:"center", fontSize:"10px"}}>{ErrorMessage}</p>
                        <Card.Text className='forget'>Forgot Password?</Card.Text> 

                        <Button variant="warning" onClick={(e)=>handleLogin(e)}>Login and Shop</Button>
                    
                    </Card.Body>
                </Card>
                <p className='returnHome' onClick={()=>setPage('HomePage')}>Return Home</p>
            </div>
        </Background>
    );
}

export default Login;