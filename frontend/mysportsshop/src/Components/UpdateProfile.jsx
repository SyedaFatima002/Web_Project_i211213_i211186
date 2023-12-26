import InputGroup from 'react-bootstrap/InputGroup';
import useProfile from "../Hooks/useProfile";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../CSS/profile.css';
import useUser from '../Hooks/useUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEmail, updatePhone, updateUsername } from '../ApiCalls/updateProfile';

function UpdateProfile() {
    const { error, isError, isLoading, data } = useProfile();
    const {token, setusername, setemail }=useUser();

    const [un, setUsername] = useState();
    const [em, setEmail] = useState();
    const [ph, setPhone] = useState();
    const [show, setShow] = useState(false);
    const queryClient=useQueryClient();

    //handle username
    const usernameMutation = useMutation({
        mutationFn: async (user) => {
            try {
                const result = await updateUsername(user.token, user.newusername, user.setusername)
                return result
            } catch (error) {
                console.error('Error updating username:', error);
                throw error;
            }
        }
    })

    const handleUsername = (e) => {
        e.preventDefault();
        usernameMutation.mutate({
            token:token,
            newusername:un,
            setusername:setusername
        },
        {
            onSuccess: (data) => {
                console.log(data);
                queryClient.invalidateQueries('getuserprofile');
                alert('Username Updated')
            },
        })
    }

    //handle email
    const emailMutation = useMutation({
        mutationFn: async (user) => {
            try {
                const result = await updateEmail(user.token, user.newemail, user.setemail)
                return result
            } catch (error) {
                console.error('Error updating useremail:', error);
                throw error;
            }
        }
    })

    const handleEmail = (e) => {
        e.preventDefault();
        emailMutation.mutate({
            token:token,
            newemail:em,
            setemail:setemail
        },
        {
            onSuccess: (data) => {
                console.log(data);
                queryClient.invalidateQueries('getuserprofile');
                alert('Emil Updated')
            },
        })
    }

    //handle phone number
    const phoneMutation = useMutation({
        mutationFn: async (user) => {
            try {
                const result = await updatePhone(user.token, user.newphone)
                return result
            } catch (error) {
                console.error('Error updating useremail:', error);
                throw error;
            }
        }
    })

    const handlePhone = (e) => {
        e.preventDefault();
        phoneMutation.mutate({
            token:token,
            newphone:ph,
        },
        {
            onSuccess: (data) => {
                console.log(data);
                queryClient.invalidateQueries('getuserprofile');
                alert('Emil Updated')
            },
        })
    }

    //handle password

    //handle address


    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <h5>Your Profile</h5>
            </div>
            {isError && <div>Sorry we cant do shit. Gonna change this late {error.message} </div>}
            {isLoading && <div>Loading Your Details</div>}
            {data &&
                <div>
                    <Form className='textsize textbox'>
                        <InputGroup className="mb-3 length">
                            <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.username}
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Button variant="warning" size={'sm'} className='length' onClick={(e)=>handleUsername(e)}>Update</Button>
                        </InputGroup>

                        <InputGroup className="mb-3 length">
                            <InputGroup.Text id="basic-addon2">Email</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.email}
                                aria-label="Email"
                                aria-describedby="basic-addon2"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button variant="warning" size={'sm'} className='length' onClick={(e)=>handleEmail(e)}>Update</Button>
                        </InputGroup>

                        <InputGroup className="mb-3 length">
                            <InputGroup.Text id="basic-addon3">Phone Number</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.phoneNumber}
                                aria-label="Phone"
                                aria-describedby="basic-addon3"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <Button variant="warning" size={'sm'} className='length' onClick={(e)=>handlePhone(e)}>Update</Button>
                        </InputGroup>

                        <InputGroup className="mb-3 length">
                            <InputGroup.Text id="basic-addon3">Password</InputGroup.Text>
                            <Button variant="warning" size={'sm'} className='length' onClick={() => setShow(!show)}>Click to Update</Button>
                            {show &&
                                <>
                                    <Form.Control
                                        type='password'
                                        defaultValue={data.password}
                                        aria-label="password"
                                        aria-describedby="basic-addon3"
                                    />
                                    <Button variant="danger" size={'sm'}>Update</Button>
                                </>
                            }
                        </InputGroup>

                        <InputGroup className="mb-3 length">
                            <InputGroup.Text id="basic-addon3">Address (Street)</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.Address[0].address}
                                aria-label="Phone"
                                aria-describedby="basic-addon3"

                            />
                            <InputGroup.Text id="basic-addon3">City</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.Address[0].city}
                                aria-label="Phone"
                                aria-describedby="basic-addon3"

                            />
                            <InputGroup.Text id="basic-addon3">Country</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.Address[0].country}
                                aria-label="Phone"
                                aria-describedby="basic-addon3"

                            />
                        </InputGroup>
                        <Button variant="warning" size={'sm'} className='length'>Update Address</Button>

                    </Form>
                </div>
            }
        </div>
    );
}

export default UpdateProfile
